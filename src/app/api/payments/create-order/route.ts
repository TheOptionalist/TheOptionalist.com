import { NextResponse } from "next/server";
import { getPaidProductById } from "@/lib/paidLearning";
import { getServerSession } from "@/lib/firebaseServer";

export const runtime = "nodejs";

function getRazorpayAuthHeader() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export async function POST(request: Request) {
  const { user } = await getServerSession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { productId?: string } | null;
  const product = body?.productId ? getPaidProductById(body.productId) : null;

  if (!product) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 });
  }

  const authHeader = getRazorpayAuthHeader();
  const keyId = process.env.RAZORPAY_KEY_ID;

  if (!authHeader || !keyId) {
    return NextResponse.json(
      {
        error:
          "Razorpay is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
      },
      { status: 501 }
    );
  }

  const receipt = `${product.id}-${user.uid}`.slice(0, 40);
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: product.amountInRupees * 100,
      currency: "INR",
      receipt,
      notes: {
        productId: product.id,
        uid: user.uid
      }
    })
  });

  const data = (await response.json().catch(() => null)) as { id?: string; error?: unknown };

  if (!response.ok || !data?.id) {
    return NextResponse.json(
      { error: "Could not create Razorpay order.", details: data?.error ?? null },
      { status: 502 }
    );
  }

  return NextResponse.json({
    keyId,
    orderId: data.id,
    amount: product.amountInRupees * 100,
    currency: "INR",
    product
  });
}
