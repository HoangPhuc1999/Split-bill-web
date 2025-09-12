"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Copy,
  Lock,
  ChevronDown,
  Search,
  Upload,
  Check,
  Clock,
  X,
  QrCode,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// Mock data - in real app this would come from API
const mockExpenseData = {
  id: "exp_abc123",
  shortId: "ABC123",
  expenseName: "Team Dinner at Sakura",
  groupName: "Work Squad",
  createdAt: "2024-01-15T19:30:00Z",
  total: 2840000,
  currency: "VND",
  breakdown: {
    subtotal: 2400000,
    tax: 240000,
    serviceFee: 120000,
    tip: 80000,
  },
  payer: {
    name: "Alice Nguyen",
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    qrCode: "/placeholder.svg?height=300&width=300&text=Payment+QR+Code",
  },
  participants: [
    {
      id: "1",
      name: "Alice Nguyen",
      owedAmount: 0,
      status: "confirmed",
      isPayer: true,
    },
    {
      id: "2",
      name: "Bob Chen",
      owedAmount: 568000,
      status: "pending",
    },
    {
      id: "3",
      name: "Carol Kim",
      owedAmount: 568000,
      status: "unpaid",
    },
    {
      id: "4",
      name: "David Park",
      owedAmount: 568000,
      status: "confirmed",
    },
    {
      id: "5",
      name: "Emma Wilson",
      owedAmount: 568000,
      status: "unpaid",
    },
  ],
  activities: [
    {
      id: "1",
      message: "Alice marked paid",
      timestamp: "22:15",
      user: "Alice Nguyen",
    },
    {
      id: "2",
      message: "You confirmed Bob",
      timestamp: "22:20",
      user: "System",
    },
  ],
  payerNote:
    "Please include the memo exactly as shown when transferring. Thanks everyone! 🍜",
};

export default function ExpensePage({
  params,
}: {
  params: { expenseId: string };
}) {
  const [perPersonQR, setPerPersonQR] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("EN");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPaymentUser, setSelectedPaymentUser] = useState<string | null>(
    null,
  );
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      default:
        return <X className="w-3 h-3" />;
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    // In real app, show toast notification
  };

  const copyMemo = async (memo: string) => {
    await navigator.clipboard.writeText(memo);
    // In real app, show toast notification
  };

  const handleMarkPaid = () => {
    // In real app, update participant status to pending
    setPaymentDialogOpen(false);
    setProofFile(null);
  };

  const filteredParticipants = mockExpenseData.participants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedParticipantData = selectedParticipant
    ? mockExpenseData.participants.find((p) => p.id === selectedParticipant)
    : null;

  const currentQRMemo =
    perPersonQR && selectedParticipantData
      ? `EXP-${mockExpenseData.shortId}-${selectedParticipantData.name.split(" ")[0]}`
      : `EXP-${mockExpenseData.shortId}-GROUP`;

  // Generate QR code when component mounts or when per-person settings change
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const amount =
          perPersonQR && selectedParticipantData
            ? selectedParticipantData.owedAmount
            : mockExpenseData.total;

        const memo = currentQRMemo;

        // Create payment data string - you can customize this format based on your payment system
        const paymentData = {
          bankName: mockExpenseData.payer.bankName,
          accountNumber: mockExpenseData.payer.accountNumber,
          accountName: mockExpenseData.payer.name,
          amount: amount,
          memo: memo,
          currency: mockExpenseData.currency,
        };

        // Generate QR code with payment information
        const qrCodeURL = await QRCode.toDataURL(JSON.stringify(paymentData), {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        setQrCodeDataURL(qrCodeURL);
      } catch (error) {
        console.error("Error generating QR code:", error);
        setQrCodeDataURL("/placeholder.svg");
      }
    };

    generateQRCode();
  }, [perPersonQR, selectedParticipantData, currentQRMemo]);

  return (
    <TooltipProvider>
      <div
        className="min-h-screen bg-background bg-cover bg-center bg-no-repeat relative"
        // style={{
        //   backgroundImage: "url('/images/test1.jpg')",
        //   backgroundAttachment: "fixed",
        // }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 "></div>
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Group Payback</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyLink}
                  aria-label="Copy expense link"
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Copy link</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Change language"
                    >
                      {language}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage("EN")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("VI")}>
                      Tiếng Việt
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Unlisted link"
                    >
                      <Lock className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unlisted link - only people with the link can view</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>

          <main className="container px-4 py-6 max-w-6xl mx-auto">
            {/* Expense Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">
                  {mockExpenseData.expenseName}
                </CardTitle>
                <CardDescription>
                  {mockExpenseData.groupName} •{" "}
                  {formatDate(mockExpenseData.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="text-3xl font-bold">
                    {formatCurrency(mockExpenseData.total)}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Tax: {formatCurrency(mockExpenseData.breakdown.tax)}
                    </Badge>
                    <Badge variant="secondary">
                      Service:{" "}
                      {formatCurrency(mockExpenseData.breakdown.serviceFee)}
                    </Badge>
                    <Badge variant="secondary">
                      Tip: {formatCurrency(mockExpenseData.breakdown.tip)}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="per-person-qr"
                      checked={perPersonQR}
                      onCheckedChange={setPerPersonQR}
                    />
                    <Label htmlFor="per-person-qr">Per-person QR</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Payment QR Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment QR Code</CardTitle>
                  <CardDescription>
                    {mockExpenseData.payer.name} •{" "}
                    {mockExpenseData.payer.bankName} • ****
                    {mockExpenseData.payer.accountNumber.slice(-4)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-64 h-64 bg-white p-4 rounded-lg border">
                      <Image
                        src={qrCodeDataURL || "/placeholder.svg"}
                        alt="Payment QR Code"
                        width={256}
                        height={256}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Memo:{" "}
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        {currentQRMemo}
                      </code>
                    </p>
                    {perPersonQR && selectedParticipantData && (
                      <p className="text-sm font-medium">
                        Amount:{" "}
                        {formatCurrency(selectedParticipantData.owedAmount)}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Save QR
                    </Button>
                    <Button variant="outline" className="flex-1" disabled>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Banking App
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Participants List */}
              <Card>
                <CardHeader>
                  <CardTitle>Participants</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      aria-label="Search participants"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          perPersonQR && selectedParticipant === participant.id
                            ? "bg-primary/5 border-primary"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {participant.isPayer
                                ? "Paid for group"
                                : formatCurrency(participant.owedAmount)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(participant.status)}>
                            {getStatusIcon(participant.status)}
                            <span className="ml-1 capitalize">
                              {participant.status}
                            </span>
                          </Badge>

                          {!participant.isPayer &&
                            participant.status === "unpaid" && (
                              <Dialog
                                open={paymentDialogOpen}
                                onOpenChange={setPaymentDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      setSelectedPaymentUser(participant.id)
                                    }
                                  >
                                    I've paid
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Mark as Paid</DialogTitle>
                                    <DialogDescription>
                                      Confirm your payment for{" "}
                                      {participant.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Amount</Label>
                                      <Input
                                        value={formatCurrency(
                                          participant.owedAmount,
                                        )}
                                        readOnly
                                        className="bg-muted"
                                      />
                                    </div>
                                    <div>
                                      <Label>Memo</Label>
                                      <div className="flex gap-2">
                                        <Input
                                          value={`EXP-${mockExpenseData.shortId}-${participant.name.split(" ")[0]}`}
                                          readOnly
                                          className="bg-muted"
                                        />
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            copyMemo(
                                              `EXP-${mockExpenseData.shortId}-${participant.name.split(" ")[0]}`,
                                            )
                                          }
                                        >
                                          <Copy className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Upload Proof (Optional)</Label>
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                          setProofFile(
                                            e.target.files?.[0] || null,
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        setPaymentDialogOpen(false)
                                      }
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleMarkPaid}>
                                      Submit Payment
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}

                          {perPersonQR && !participant.isPayer && (
                            <Button
                              variant={
                                selectedParticipant === participant.id
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setSelectedParticipant(
                                  selectedParticipant === participant.id
                                    ? null
                                    : participant.id,
                                )
                              }
                            >
                              {selectedParticipant === participant.id
                                ? "Selected"
                                : "Show QR"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity & Notes */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockExpenseData.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>{activity.message}</span>
                        <span className="text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {mockExpenseData.payerNote}
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t mt-12">
            <div className="container px-4 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>🔒 Unlisted page - anyone with the link can view</p>
                <div className="flex gap-4">
                  <a
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>{" "}
        {/* Close content wrapper */}
      </div>{" "}
      {/* Close background container */}
    </TooltipProvider>
  );
}
