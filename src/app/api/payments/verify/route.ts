import crypto from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPaidProductById } from "@/lib/paidLearning";
import { getUnlockUpdateForProduct } from "@/lib/paymentAccess";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";
import { getServerSession } from "@/lib/firebaseServer";

export const runtime = "nodejs";

type VerifyBody = {
  productId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

function isValidRazorpaySignature(body: VerifyBody) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;

  if (!keySecret || !orderId || !paymentId || !signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(request: Request) {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as VerifyBody | null;
  const product = body?.productId ? getPaidProductById(body.productId) : null;

  if (!body || !product) {
    return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
  }

  if (!isValidRazorpaySignature(body)) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  const providerPaymentId = body.razorpay_payment_id;
  const providerOrderId = body.razorpay_order_id;

  if (!providerPaymentId || !providerOrderId) {
    return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
  }

  const { db, error } = getFirebaseAdmin();

  if (!db) {
    return NextResponse.json(
      { error: error?.message ?? "Missing Firebase admin config." },
      { status: 500 }
    );
  }

  const unlock = getUnlockUpdateForProduct(product, {
    providerPaymentId,
    providerOrderId,
    createdAt: FieldValue.serverTimestamp(),
    arrayUnion: FieldValue.arrayUnion
  });

  const profileRef = db.collection("profiles").doc(user.uid);
  const purchaseRef = profileRef.collection("purchases").doc(providerPaymentId);

  await db.runTransaction(async (transaction) => {
    transaction.set(profileRef, unlock.profileUpdate, { merge: true });
    transaction.set(purchaseRef, unlock.purchaseRecord, { merge: true });
  });

  return NextResponse.json({ ok: true });
}
