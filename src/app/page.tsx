"use client";

import Link from "next/link";
import { Lock, Link2, QrCode, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <span className="text-2xl font-bold text-gray-900">Split</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  How it works
                </Link>
                <Link
                  href="/search"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Search bill
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-gray-700">
                Log in
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Split bills easily.{" "}
                  <span className="text-orange-500">Get paid instantly.</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  No more chasing friends for money.
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  Create → Share → Get paid.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full"
                >
                  Create a bill
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full border-2"
                >
                  <span className="mr-2">▶</span> See how it works
                </Button>
              </div>

              <div className="flex items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span>Fast</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span>Simple</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <span>Works without app</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 lg:p-12">
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Cafe tối</h3>
                      <span className="text-sm text-gray-500">16</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-500">
                      140.000 đ
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
                      <div className="w-48 h-48 bg-black rounded-lg flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-white" />
                      </div>
                    </div>
                    <p className="text-center text-sm font-medium text-gray-700">
                      Scan to pay
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">
                          Minh <span className="text-gray-500">paid</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-orange-300" />
                        <span className="text-sm font-medium">
                          Ngan{" "}
                          <span className="text-gray-500">owes 50.000 đ</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-30" />
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 text-center space-y-4 border-2 hover:border-orange-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  ₫
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Create a bill</h3>
              <p className="text-gray-600">Add amount</p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 text-center space-y-4 border-2 hover:border-purple-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center">
                <Link2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Share a link</h3>
              <p className="text-gray-600">With friends</p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 text-center space-y-4 border-2 hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Scan & pay</h3>
              <p className="text-gray-600">Instant QR</p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 text-center space-y-4 border-2 hover:border-green-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Get settled</h3>
              <p className="text-gray-600">Everyone paid</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Ready to simplify your splits?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of people splitting bills the easy way.
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg rounded-full"
          >
            Get started for free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold text-gray-900">Split</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2026 Split. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
