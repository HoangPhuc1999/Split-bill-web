"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SearchBillPage() {
  const [expenseId, setExpenseId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!expenseId.trim()) {
      return;
    }

    setIsSearching(true);
    // Navigate to expense detail page
    router.push(`/expense/${expenseId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="text-2xl font-bold text-gray-900">Split</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-gray-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <div className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Search className="w-10 h-10" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Search for a Bill
            </h1>
            <p className="text-xl text-gray-600">
              Enter the expense ID or bill code to view details and make your
              payment
            </p>
          </div>

          <Card className="shadow-xl border-2">
            <CardHeader>
              <CardTitle>Find Your Expense</CardTitle>
              <CardDescription>
                Enter the unique expense ID you received to view bill details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="expenseId"
                    className="text-sm font-medium text-gray-700"
                  >
                    Expense ID
                  </label>
                  <div className="relative">
                    <Input
                      id="expenseId"
                      type="text"
                      placeholder="e.g., exp_123456 or ABC123"
                      value={expenseId}
                      onChange={(e) => setExpenseId(e.target.value)}
                      className="text-lg px-4 py-6 pr-12"
                      autoFocus
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={!expenseId.trim() || isSearching}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      Search Bill
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Where do I find my expense ID?
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>
                      Check the link or message sent by the person who created
                      the bill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>
                      Look for a code in your email or SMS notification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>
                      It's usually in the format: exp_123456 or a short code
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Don't have an expense ID?</p>
            <Link href="/">
              <Button variant="outline" size="lg" className="border-2">
                Create a New Bill
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
