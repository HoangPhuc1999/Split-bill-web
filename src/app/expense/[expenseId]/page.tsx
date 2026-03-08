"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { ChevronDown, Download } from "lucide-react";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import type { Expense } from "@/models/Expense";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data - in real app this would come from API

export default function ExpenseDetailPage({
  params,
}: {
  params: Promise<{ expenseId: string }>;
}) {
  const { expenseId } = use(params);
  const [expenseData, setExpenseData] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splitDetailsOpen, setSplitDetailsOpen] = useState(true);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  // Fetch expense details on component mount
  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ExpenseRepository.getExpenseDetails(expenseId);
        setExpenseData(data);
      } catch (err) {
        console.error("Error fetching expense details:", err);
        setError("Failed to load expense details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (expenseId) {
      fetchExpenseDetails();
    }
  }, [expenseId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .toLowerCase();
  };

  const handleMarkPaid = () => {
    // In real app, update participant status to pending
    setPaymentDialogOpen(false);
  };

  const handleSaveQR = () => {
    if (!expenseData?.qr_code_url) return;

    // Simple download using anchor tag
    const link = document.createElement("a");
    link.href = expenseData.qr_code_url;
    link.download = `payment-qr-${expenseId}.png`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate user's share (assuming first participant is current user)
  const userShare = expenseData?.participants?.[0]?.share || 300000;
  const payer = expenseData?.participants?.find(
    (p) => p.user_id === expenseData?.paid_by,
  );
  const payerName = payer?.name || "Bobby";

  // Get expense details
  const expenseName = expenseData?.description || "";
  const totalAmount = expenseData?.amount || 0;
  const expenseNote = expenseData?.note || "Pay your share please.";

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading expense details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  const iconUrl = expenseData?.icon
    ? `/${expenseData.icon}.svg`
    : "/placeholder.svg";
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 relative">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pay your share</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Your Share Card */}
          <div className="bg-[#5A7ACD] rounded-2xl p-6 text-white shadow-lg">
            <p className="text-xl font-medium opacity-90 mb-1">{expenseName}</p>
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xl text-white "> Total Amount</p>
                <p className="font-medium text-2xl">
                  {" "}
                  {formatCurrency(totalAmount)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Paid by</p>
                <p className="font-medium">{payerName}</p>
              </div>
            </div>
          </div>

          {/* QR Code and Expense Note Section */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Scan to pay */}
            <div className="max-w-[340px]">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Scan to pay
              </h2>
              <div className="bg-white border rounded-xl p-4 flex items-center justify-center mb-5">
                <Image
                  src={expenseData?.qr_code_url || "/placeholder.svg"}
                  alt="Payment QR Code"
                  width={300}
                  height={300}
                  className="w-[300px] h-[300px]"
                />
              </div>
              <Button
                variant="outline"
                onClick={handleSaveQR}
                className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Save QR
              </Button>
            </div>

            {/* Expense Note */}
            {expenseData?.note && (
              <div className="flex flex-col justify-start h-full mt-10">
                {expenseData?.icon ? (
                  <>
                    {expenseNote && (
                      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <p className="text-black text-sm">
                          {expenseNote || ""}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-center mb-10">
                      <Image
                        src={iconUrl}
                        alt="Expense icon"
                        width={200}
                        height={200}
                        className="w-[250px] h-[250px] object-contain"
                      />
                    </div>
                  </>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-black text-sm">{expenseNote || ""}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setSplitDetailsOpen(!splitDetailsOpen)}
              className="w-full flex items-center justify-between p-4 bg-gray-50"
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Split details
              </h2>
              <ChevronDown
                className={`w-5 h-5 text-gray-700 transition-transform ${
                  splitDetailsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {splitDetailsOpen && (
              <div className="bg-gray-50">
                {expenseData?.participants?.map(
                  (participant, index: number) => {
                    // biome-ignore lint/suspicious/noExplicitAny: Handling union of API and mock data types
                    const participantData = participant as any;
                    const participantId =
                      participantData.user_id || participantData.id;
                    const participantAmount =
                      participantData.share || participantData.owedAmount;
                    const isPayer =
                      participantData.user_id === expenseData?.paid_by ||
                      participantData.isPayer;

                    return (
                      <div
                        key={participantId || index}
                        className="flex items-center justify-between p-4 bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-purple-200 text-purple-800">
                              {participantData.name
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              {participantData.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {isPayer
                                ? "Paid the full amount"
                                : `Owes ${payerName}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(participantAmount)}
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
