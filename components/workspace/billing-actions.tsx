"use client";

import { useState } from "react";

type PaymentResponse = {
  paymentUrl?: string;
  payment?: {
    transactionId: string;
    status: string;
    amount: number;
  };
};

export function BillingActions({ userId, plan }: { userId: string; plan: string }) {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<PaymentResponse>();
  const [message, setMessage] = useState<string>();

  async function createPayment() {
    setLoading(true);
    setMessage(undefined);
    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, plan }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(result.error || "Gagal membuat pembayaran.");
      return;
    }
    setPayment(result.data);
    setMessage("Invoice sandbox dibuat. Klik simulasi paid untuk mengaktifkan plan.");
  }

  async function simulatePaid() {
    if (!payment?.payment?.transactionId) return;
    setLoading(true);
    const response = await fetch("/api/payment/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId: payment.payment.transactionId, status: "paid" }),
    });
    const result = await response.json();
    setLoading(false);
    setMessage(result.data?.message || result.error || "Webhook selesai.");
  }

  return (
    <div className="mt-5 space-y-3">
      <button disabled={loading} onClick={createPayment} className="w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60">
        {loading ? "Memproses..." : `Pilih ${plan}`}
      </button>
      {payment?.paymentUrl && (
        <div className="rounded-2xl bg-blue-50 p-4 text-sm text-primary">
          <p className="font-bold">Payment URL Sandbox</p>
          <p className="mt-1 break-all">{payment.paymentUrl}</p>
          <button disabled={loading} onClick={simulatePaid} className="mt-3 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white disabled:opacity-60">Simulasi Midtrans Paid</button>
        </div>
      )}
      {message && <p className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">{message}</p>}
    </div>
  );
}
