"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Database, Shield, Zap, Terminal, Wallet, Cpu, CheckCircle } from "lucide-react";
import { LandingNavbar } from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const guidelinesRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: guidelinesRef,
    offset: ["start start", "end end"]
  });

  const cardY = useTransform(scrollYProgress, [0, 0.15, 0.35], [100, 100, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [0, 0, 1]);

  const stories = [
    {
      name: "Sarah K.",
      quote: "I make an extra $300 a week just recording myself making dinner and doing laundry! It’s the easiest side-hustle ever and the weekly payouts are incredibly reliable.",
      title: "Top Earner"
    },
    {
      name: "Alex M.",
      quote: "I just mount my phone while I'm fixing bikes in my garage. It's crazy that I can earn real cash for data collection while doing my normal job.",
      title: "Consistent Creator"
    },
    {
      name: "David R.",
      quote: "The instant approval is amazing. I record a quick 10-minute task wearing my smart glasses, upload it on the app, and know I'm getting paid.",
      title: "New Creator"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-cyan-500 selection:text-white overflow-clip">
      {/* Navbar */}
      <LandingNavbar />

      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-4 md:px-6">
          <div className="relative mx-auto max-w-[1400px] h-[700px] rounded-[1.5rem] overflow-hidden flex items-end p-8 md:p-16">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-zinc-900 bg-cover bg-center"
              style={{ backgroundImage: 'url(/hero-bg-gig.png)' }}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6">
                Turn Your Daily Tasks Into Income
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-light">
                Join thousands of people earning money by collecting everyday video data. Whether you're doing dishes, riding your bike, or walking the dog—strap on a camera and start earning today.
              </p>

              <Link
                href="/apply"
                className="group relative inline-flex items-center rounded-lg bg-white p-1 pr-1.5 transition-transform hover:scale-[0.98]"
              >
                <span className="pl-4 pr-3 text-[15px] font-medium text-black">
                  Start Earning
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Use Case / Stats Banner */}
        <section className="border-y border-zinc-100 bg-zinc-50 py-12 mt-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-center text-sm font-mono tracking-widest text-zinc-500 mb-8 uppercase">
              Supply Data to the World's Top AI Labs
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale text-center font-bold text-xl lg:text-2xl text-black">
              <div>PHYSICAL INTEL</div>
              <div>GENERALIST</div>
              <div>COBOT</div>
              <div>DYNA DYNAMICS</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 lg:py-32 px-6 lg:px-8 relative bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16 lg:mb-24">
              <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-zinc-500">
                CREATOR BENEFITS
              </div>
              <h2 className="text-4xl md:text-5xl font-medium text-black text-balance">
                Earn Money on Your Own Schedule
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {/* Feature 1 */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-black">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-3">Simple App Uploads</h3>
                  <p className="text-zinc-500 leading-relaxed text-[15px]">
                    Record directly on your phone or smart glasses and upload with one tap. No complicated formatting or technical skills required.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-black">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-3">Instant Video Approval</h3>
                  <p className="text-zinc-500 leading-relaxed text-[15px]">
                    Get immediate feedback on your recordings. Our system automatically checks your video quality so you know right away if it's approved.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-black">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-3">Weekly Cash Payouts</h3>
                  <p className="text-zinc-500 leading-relaxed text-[15px]">
                    Earn competitive rates for every approved video. We process payouts directly to your bank account every single week.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-black">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-3">Use Your Own Devices</h3>
                  <p className="text-zinc-500 leading-relaxed text-[15px]">
                    You don't need expensive equipment. Use the smartphone in your pocket, an old GoPro, or your smart glasses to start earning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Architecture Spotlight */}
        <section id="infrastructure" className="py-24 lg:py-32 px-6 lg:px-8 bg-zinc-50 border-t border-zinc-100 relative overflow-hidden">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-zinc-500">
                CREATOR DASHBOARD
              </div>
              <h2 className="text-3xl md:text-5xl font-medium text-black mb-6 text-balance">
                Track Your Earnings Easily
              </h2>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                Manage all your videos, track your accepted tasks, and watch your earnings grow from a simple dashboard.
              </p>
              <ul className="space-y-4">
                {[
                  "See exactly which videos were approved and how much you earned",
                  "Track your pending weekly payouts in real-time",
                  "Find new high-paying tasks and household challenges daily",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-700 font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white shrink-0">
                      <Terminal className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-black hover:text-zinc-600 font-medium uppercase tracking-wider text-[13px] transition-colors"
                >
                  View Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Dashboard Video */}
            <div className="relative rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              >
                <source src="/context_CREATOR_DASHBOARD_Tra.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Equipment & Setup Guide */}
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white border-t border-zinc-100">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-zinc-500">
                SUPPORTED EQUIPMENT
              </div>
              <h2 className="text-3xl md:text-5xl font-medium text-black mb-6 text-balance">
                Use Devices You Already Own
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl">
                We support a variety of everyday devices for video collection. No expensive gear required.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100 border border-zinc-200 relative">
                  <img src="/equipment_glasses.png" alt="Smart Glasses" className="object-cover w-full h-full" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Smart Glasses</h3>
                <p className="text-[15px] text-zinc-500 leading-relaxed">
                  Capture seamless first-person video while running errands, cooking, or working around the house. Perfect for Meta Ray-Bans.
                </p>
              </div>
              {/* Card 2 */}
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100 border border-zinc-200 relative">
                  <img src="/equipment_phone.png" alt="Smartphones" className="object-cover w-full h-full" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Smartphones & Gimbals</h3>
                <p className="text-[15px] text-zinc-500 leading-relaxed">
                  Use the device already in your pocket. Mount your phone on a cheap tripod or gimbal to record hands-free household tasks.
                </p>
              </div>
              {/* Card 3 */}
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-100 border border-zinc-200 relative">
                  <img src="/equipment_actioncam.png" alt="Action Cameras" className="object-cover w-full h-full" />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Action Cameras</h3>
                <p className="text-[15px] text-zinc-500 leading-relaxed">
                  Chest-mounted GoPros and action cams are perfect for hands-free, outdoor activities like biking, walking, or sports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Guidelines & Uploading - Scrollytelling */}
        <section ref={guidelinesRef} className="relative h-[300vh] border-t border-zinc-100 bg-white">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center p-3 md:p-8 lg:p-12 overflow-hidden">
            <div className="relative w-full max-w-[1400px] h-full max-h-[1200px] rounded-[1.5rem] overflow-hidden flex items-center p-3 md:p-12 lg:p-16 shadow-2xl border border-zinc-200/50">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/can_you_make_a_video_of_this_i.mp4" type="video/mp4" />
              </video>
              {/* Very Light Overlay to take the edge off */}
              <div className="absolute inset-0 bg-zinc-950/20" />

              {/* Content Area */}
              <div className="relative z-10 w-full h-full flex items-center md:items-center justify-center md:justify-end">
                <motion.div 
                  style={{ y: cardY, opacity: cardOpacity }}
                  className="max-w-xl w-full bg-black/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl"
                >
                  <div className="text-[10px] md:text-xs leading-6 tracking-[1px] mb-2 md:mb-4 uppercase font-mono text-emerald-400 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">
                    UPLOAD STANDARDS
                  </div>
                  <h2 className="text-2xl md:text-4xl font-medium text-white mb-3 md:mb-6 text-balance [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.8)]">
                    Recording Guidelines
                  </h2>
                  <p className="text-sm md:text-base text-zinc-300 mb-5 md:mb-8 leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">
                    Follow these three simple rules when recording your tasks to make sure your videos are approved and you get paid fast.
                  </p>
                  <ul className="space-y-3 md:space-y-6">
                    <li className="flex gap-3 md:gap-4">
                      <div className="flex h-6 w-6 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white border border-white/20">
                        <span className="text-xs md:text-base font-bold font-mono">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm md:text-base mb-0.5 md:mb-1 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Clear Lighting & Focus</h4>
                        <p className="text-xs md:text-sm text-zinc-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Make sure your room is well-lit and the camera lens is clean. Blurry or dark videos can't be used.</p>
                      </div>
                    </li>
                    <li className="flex gap-3 md:gap-4">
                      <div className="flex h-6 w-6 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white border border-white/20">
                        <span className="text-xs md:text-base font-bold font-mono">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm md:text-base mb-0.5 md:mb-1 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Record the Whole Task</h4>
                        <p className="text-xs md:text-sm text-zinc-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Start recording before you begin the task and don't stop until it's completely finished. No editing or cutting.</p>
                      </div>
                    </li>
                    <li className="flex gap-3 md:gap-4">
                      <div className="flex h-6 w-6 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white border border-white/20">
                        <span className="text-xs md:text-base font-bold font-mono">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm md:text-base mb-0.5 md:mb-1 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">Keep Your Hands Visible</h4>
                        <p className="text-xs md:text-sm text-zinc-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_0.8)]">If you're using a chest cam or smart glasses, make sure both of your hands are clearly visible in the video frame while you work.</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Stories */}
        <section className="px-4 md:px-6 py-24 lg:py-32 bg-white">
          <style>{`
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-slide {
              animation: fadeSlideIn 0.4s ease-out forwards;
            }
          `}</style>
          <div className="mx-auto max-w-[1400px] rounded-[1.5rem] bg-[#12312b] p-8 md:p-16 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-3">
                <div className="text-[11px] leading-relaxed tracking-[0.2em] mb-8 uppercase font-mono text-emerald-100/70">
                  CREATOR STORIES
                </div>
                <div className="flex flex-col gap-3">
                  {stories.map((story, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStoryIndex(idx)}
                      className={`text-left px-5 py-4 rounded-xl font-medium text-sm transition-all border ${activeStoryIndex === idx
                          ? "bg-white text-[#12312b] border-transparent shadow-lg shadow-black/10"
                          : "bg-white/5 text-white/60 hover:bg-white/10 border-white/10 hover:text-white"
                        }`}
                    >
                      {story.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-9 lg:pl-16 flex flex-col justify-between h-full min-h-[350px]">
                <div className="flex-1 flex items-start">
                  <h2
                    key={activeStoryIndex}
                    className="animate-fade-slide text-3xl md:text-4xl lg:text-[42px] font-medium text-white leading-[1.3] tracking-tight text-balance"
                  >
                    "{stories[activeStoryIndex].quote}"
                  </h2>
                </div>
                <div className="mt-8 flex items-end justify-between shrink-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveStoryIndex((prev) => (prev > 0 ? prev - 1 : stories.length - 1))}
                      className="h-11 w-11 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg"
                    >
                      {"<"}
                    </button>
                    <button
                      onClick={() => setActiveStoryIndex((prev) => (prev < stories.length - 1 ? prev + 1 : 0))}
                      className="h-11 w-11 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg"
                    >
                      {">"}
                    </button>
                  </div>
                  <div key={`author-${activeStoryIndex}`} className="animate-fade-slide text-right">
                    <div className="text-white font-medium text-lg">{stories[activeStoryIndex].name}</div>
                    <div className="text-emerald-100/80 font-mono text-[10px] uppercase tracking-widest mt-1 bg-white/10 inline-block px-2 py-1 rounded">
                      {stories[activeStoryIndex].title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
