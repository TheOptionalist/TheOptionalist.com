"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PaidUnlockButtonProps = {
  productId: string;
  label: string;
  className?: string;
};

type CreateOrderResponse = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  product: {
    id: string;
    title: string;
    description: string;
    amountInRupees: number;
  };
  error?: string;
};

type RazorpayCheckout = new (options: {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  theme: { color: string };
}) => { open: () => void };

declare global {
  interface Window {
    Razorpay?: RazorpayCheckout;
  }
}

export default function PaidUnlockButton({
  productId,
  label,
  className = "button primary"
}: PaidUnlockButtonProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUnlock() {
    setLoading(true);
    setMessage(null);

    try {
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });
      const order = (await orderResponse.json()) as CreateOrderResponse;

      if (!orderResponse.ok) {
        throw new Error(order.error ?? "Payment could not be started.");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout script is not loaded yet.");
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "The Optionalist",
        description: order.product.title,
        order_id: order.orderId,
        handler: async (response) => {
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId,
              ...response
            })
          });

          if (!verifyResponse.ok) {
            setMessage("Payment done, but verification failed. Contact admin.");
            return;
          }

          setMessage("Unlocked successfully.");
          router.refresh();
        },
        theme: { color: "#e0705d" }
      });

      checkout.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment could not be started.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="paid-unlock-action">
      <button className={className} type="button" onClick={handleUnlock} disabled={loading}>
        {loading ? "Starting payment..." : label}
      </button>
      {message ? (
        <p className="paid-unlock-message" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
