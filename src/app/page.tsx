"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Link2, QrCode, CheckCircle2, Receipt } from "lucide-react";
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
                <Link
                  href="#download"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Download
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="flex flex-row justify-center items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Split bills easily. <br />
                  <span className="text-orange-500">Get paid instantly.</span>
                </h1>
                <p className="text-2xl text-gray-600 max-w-lg">
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
              <Image
                src="/splash_image.png"
                alt="Split App Preview"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl"
                priority
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-30" />
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 pt-5 pb-10 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-0 relative">
            {/* Feature 1 */}
            <Card className="p-3 text-center  bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] rounded-2xl border-0 relative max-w-[180px] mx-auto w-full">
              <div className="w-14 h-14 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Receipt className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Create a bill
              </h3>
              <p className="text-sm text-gray-600">Add amount</p>
              {/* Arrow */}
              <div className="hidden lg:block absolute -right-15 top-1/2 -translate-y-1/2 text-orange-400 z-10">
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  width="70"
                  height="30"
                  viewBox="0 0 70 30"
                  className="opacity-60"
                >
                  <path
                    d="M 5 15 Q 35 8, 65 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 62 13 L 65 15 L 62 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-3 text-center  bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] rounded-2xl border-0 relative max-w-[180px] mx-auto w-full">
              <div className="w-14 h-14 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <Link2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Share a link
              </h3>
              <p className="text-sm text-gray-600">With friends</p>
              {/* Arrow */}
              <div className="hidden lg:block absolute -right-15 top-1/2 -translate-y-1/2 text-purple-400 z-10">
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  width="70"
                  height="30"
                  viewBox="0 0 70 30"
                  className="opacity-60"
                >
                  <path
                    d="M 5 15 Q 35 22, 65 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 62 13 L 65 15 L 62 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-3 text-center bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] rounded-2xl border-0 relative max-w-[180px] mx-auto w-full">
              <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <QrCode className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Scan & pay</h3>
              <p className="text-sm text-gray-600">Instant QR</p>
              {/* Arrow */}
              <div className="hidden lg:block absolute -right-15 top-1/2 -translate-y-1/2 text-blue-400 z-10">
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  width="70"
                  height="30"
                  viewBox="0 0 70 30"
                  className="opacity-60"
                >
                  <path
                    d="M 5 15 Q 35 8, 65 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 62 13 L 65 15 L 62 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            </Card>

            {/* Feature 4 */}
            <Card className="p-3 text-center bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)] rounded-2xl border-0 max-w-[180px] mx-auto w-full">
              <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Get settled</h3>
              <p className="text-sm text-gray-600">Everyone paid</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background text elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left column */}
          <p className="absolute top-12 left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-3deg]">
            "Ê mày trả trước cho tao, tí về tao trả lại 😅"
          </p>
          <p className="absolute top-24 left-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[2deg]">
            "Để tao chuyển sau nha bro"
          </p>
          <p className="absolute top-36 left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-4deg]">
            "Mai tao gửi nha, quên ví rồi"
          </p>
          <p className="absolute top-48 left-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[3deg]">
            "Cho tao số tài khoản đi"
          </p>
          <p className="absolute top-60 left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-2deg]">
            "Ủa ngân hàng gì vậy?"
          </p>
          <p className="absolute top-72 left-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[4deg]">
            "Ê mày còn nợ tao hôm bữa đó 😐"
          </p>
          <p className="absolute top-[21rem] left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-3deg]">
            "Ủa mày chưa trả hả?"
          </p>
          <p className="absolute top-[24rem] left-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[2deg]">
            "Tao nhắc hoài luôn á…"
          </p>
          <p className="absolute top-[27rem] left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-4deg]">
            "Ai giữ tiền lẻ?"
          </p>
          <p className="absolute top-[30rem] left-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[3deg]">
            "Ủa tao chưa trả hả?"
          </p>
          <p className="absolute top-[33rem] left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-2deg]">
            "Ê hình như tao trả rồi mà?"
          </p>
          <p className="absolute top-[36rem] left-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[4deg]">
            "Để tao check lại nha…"
          </p>
          <p className="absolute top-[39rem] left-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[-3deg]">
            "Ủa hôm đó ai trả nhỉ?"
          </p>

          {/* Right column */}
          <p className="absolute top-16 right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[3deg]">
            "Đợi cuối tháng nha"
          </p>
          <p className="absolute top-28 right-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[-2deg]">
            "Đợi tao rảnh tao chuyển"
          </p>
          <p className="absolute top-40 right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[4deg]">
            "Tí nữa nha đang bận"
          </p>
          <p className="absolute top-52 right-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[-3deg]">
            "Đang kẹt tiền xíu 😭"
          </p>
          <p className="absolute top-64 right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[2deg]">
            "Ủa sao không quét QR được?"
          </p>
          <p className="absolute top-76 right-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[-4deg]">
            "App tao lỗi rồi 😭"
          </p>
          <p className="absolute top-[22rem] right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[3deg]">
            "Tao chuyển rồi đó check lại đi"
          </p>
          <p className="absolute top-[25rem] right-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[-2deg]">
            "Ủa sao ngân hàng khác?"
          </p>
          <p className="absolute top-[28rem] right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[4deg]">
            "Thôi để tao bao, lần sau tụi mày trả 😏"
          </p>
          <p className="absolute top-[31rem] right-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[-3deg]">
            "Ê mày trả trước cho tao, tí về tao trả lại 😅"
          </p>
          <p className="absolute top-[34rem] right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[2deg]">
            "Để tao chuyển sau nha bro"
          </p>
          <p className="absolute top-[37rem] right-[18%] text-gray-400 text-base font-medium opacity-60 rotate-[-4deg]">
            "Mai tao gửi nha, quên ví rồi"
          </p>
          <p className="absolute top-[40rem] right-[15%] text-gray-400 text-base font-medium opacity-60 rotate-[3deg]">
            "Ủa mày chưa trả hả?"
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          {/* Cat illustration */}
          <div className="flex justify-center mb-6">
            <Image
              src={"/mascot_5.svg"}
              alt="Expense icon"
              width={200}
              height={200}
              className="w-[250px] h-[250px] object-contain"
            />{" "}
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Someone still owes you?
          </h2>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            See Chiti in action
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16">
            Create a shared expense, add a little personality, and send it out{" "}
            <span className="font-semibold text-gray-900">in seconds</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {/* Step 1 */}
            <div className="text-center space-y-4 relative">
              <div className="text-base text-gray-500 mb-2">
                Step 1{" "}
                <span className="font-semibold text-gray-900 ml-2">Create</span>
              </div>
              <Image
                src="/step1.png"
                alt="Expense icon"
                width={500}
                height={500}
                className="w-[350px] h-[350px] object-contain mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                1. Create an expense
              </h3>
              <p className="text-gray-600 text-base">
                Add the total, write a note, and choose who's splitting.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 relative">
              <div className="text-base text-gray-500 mb-2">
                Step 2{" "}
                <span className="font-semibold text-gray-900 ml-2">
                  Personalize
                </span>
              </div>
              <Image
                src="/step2.png"
                alt="Expense icon"
                width={500}
                height={500}
                className="w-[350px] h-[350px] object-contain mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                2. Pick a sticker
              </h3>
              <p className="text-gray-600 text-base">
                Make the bill feel more personal and easier to recognize later.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="text-sm text-gray-500 mb-2">
                Step 3{" "}
                <span className="font-semibold text-gray-900 ml-2">
                  Add Friends
                </span>
              </div>
              <Image
                src="/step5.png"
                alt="Expense icon"
                width={500}
                height={500}
                className="w-[350px] h-[350px] object-contain mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                3. Add friends to the bill
              </h3>
              <p className="text-gray-600 text-base">
                Add friends to the bill to share.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="text-base text-gray-500 mb-2">
                Step 4{" "}
                <span className="font-semibold text-gray-900 ml-2">
                  Generate
                </span>
              </div>
              <Image
                src="/step3.png"
                alt="Expense icon"
                width={500}
                height={500}
                className="w-[350px] h-[350px] object-contain mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                4. Generate and share bill
              </h3>
              <p className="text-gray-600 text-base">
                Create a shareable link to send to your friends.
              </p>
            </div>

            {/* Step 5 */}
            <div className="text-center space-y-4">
              <div className="text-base text-gray-500 mb-2">
                Step 5{" "}
                <span className="font-semibold text-gray-900 ml-2">Review</span>
              </div>
              <Image
                src="/step6.png"
                alt="Expense icon"
                width={700}
                height={500}
                className="w-[350px] h-[350px] object-contain mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                5. Your friend sees the bill
              </h3>
              <p className="text-gray-600 text-base">
                Friends can view all the details and payment information.
              </p>
            </div>

            {/* Step 6 */}
            <div className="text-center space-y-4">
              <div className="text-base text-gray-500 mb-2">
                Step 6{" "}
                <span className="font-semibold text-gray-900 ml-2">
                  Complete
                </span>
              </div>
              <Image
                src="/step7.png"
                alt="Expense icon"
                width={500}
                height={500}
                className="w-[350px] h-[350px] object-contain mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                6. Mark as paid
              </h3>
              <p className="text-gray-600 text-base">
                Friends who already paid can be marked as complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Friendship Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Don't let unpaid bills ruin your friendships
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Scenario 1 */}
            <div className="text-center space-y-4">
              <Image
                src={"/mascot_5.svg"}
                alt="Expense icon"
                width={100}
                height={200}
                className="w-[250px] h-[250px] object-contain mx-auto"
              />{" "}
              <h3 className="text-xl font-bold text-gray-900">
                When <span className="font-bold">nobody</span> pays you...
              </h3>
              <p className="text-gray-600">2 friends still owe.</p>
            </div>

            {/* Scenario 2 */}
            <div className="text-center space-y-4">
              <Image
                src={"/mascot_6.svg"}
                alt="Expense icon"
                width={200}
                height={200}
                className="w-[250px] h-[250px] object-contain mx-auto"
              />{" "}
              <h3 className="text-xl font-bold text-gray-900">
                When friends are <span className="font-bold">slow</span>...
              </h3>
              <p className="text-gray-600">Waiting for payments...</p>
            </div>

            {/* Scenario 3 */}
            <div className="text-center space-y-4">
              <Image
                src={"/mascot_1.svg"}
                alt="Expense icon"
                width={200}
                height={200}
                className="w-[250px] h-[250px] object-contain mx-auto"
              />{" "}
              <h3 className="text-xl font-bold text-gray-900">
                <span className="font-bold">Everyone paid!</span> 😊✨
              </h3>
              <p className="text-gray-600">Everyone paid! Drinks on you!!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why People Love Section */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why people love Chiti
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Features list */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl text-gray-900">
                  Instant QR payments
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl text-gray-900">
                  No app needed to pay
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl text-gray-900">
                  Automatic splitting
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl text-gray-900">
                  Link sharing within seconds
                </span>
              </div>
            </div>

            {/* Right side - App download and cat */}
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className="bg-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-3xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Download on</div>
                    <div className="font-bold text-gray-900">App Store</div>
                  </div>
                </button>

                {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className="bg-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-3xl">▶️</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Get it on</div>
                    <div className="font-bold text-gray-900">Google Play</div>
                  </div>
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm">
                Free for iPhone and Android
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full items-center">
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
