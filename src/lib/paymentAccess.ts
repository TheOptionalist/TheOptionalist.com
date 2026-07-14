import "server-only";
import type { FieldValue } from "firebase-admin/firestore";
import type { ProfileRecord } from "./firebaseServer";
import type { PaidProduct } from "./paidLearning";

export type PaymentUnlockUpdate = {
  profileUpdate: {
    paidAccess: {
      netJrfAnthropologyModules?: FieldValue;
      mockTests?: boolean;
    };
  };
  purchaseRecord: {
    productId: string;
    title: string;
    amountInRupees: number;
    unlockedAccess: string;
    provider: "razorpay";
    providerPaymentId: string;
    providerOrderId: string;
    createdAt: FieldValue;
  };
};

export function hasNetJrfModuleAccess(
  profile: ProfileRecord | null,
  moduleId: string
) {
  return Boolean(profile?.paidAccess?.netJrfAnthropologyModules?.includes(moduleId));
}

export function hasMockTestsAccess(profile: ProfileRecord | null) {
  return profile?.paidAccess?.mockTests === true;
}

export function getUnlockedNetJrfModuleIds(profile: ProfileRecord | null) {
  return new Set(profile?.paidAccess?.netJrfAnthropologyModules ?? []);
}

export function getUnlockUpdateForProduct(
  product: PaidProduct,
  payment: {
    providerPaymentId: string;
    providerOrderId: string;
    createdAt: FieldValue;
    arrayUnion: (value: string) => FieldValue;
  }
): PaymentUnlockUpdate {
  if (product.type === "mock-tests-pass") {
    return {
      profileUpdate: {
        paidAccess: {
          mockTests: true
        }
      },
      purchaseRecord: {
        productId: product.id,
        title: product.title,
        amountInRupees: product.amountInRupees,
        unlockedAccess: "mock-tests",
        provider: "razorpay",
        providerPaymentId: payment.providerPaymentId,
        providerOrderId: payment.providerOrderId,
        createdAt: payment.createdAt
      }
    };
  }

  const moduleId = product.metadata.moduleId;

  return {
    profileUpdate: {
      paidAccess: {
        netJrfAnthropologyModules: payment.arrayUnion(moduleId)
      }
    },
    purchaseRecord: {
      productId: product.id,
      title: product.title,
      amountInRupees: product.amountInRupees,
      unlockedAccess: moduleId,
      provider: "razorpay",
      providerPaymentId: payment.providerPaymentId,
      providerOrderId: payment.providerOrderId,
      createdAt: payment.createdAt
    }
  };
}
