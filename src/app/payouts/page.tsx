"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Database, Shield, Zap, Terminal, Wallet, Cpu, CheckCircle, Activity, LayoutGrid, Clock, BadgeCheck, X } from "lucide-react";

export default function PayoutsPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png" alt="Dave Logo" className="h-24 w-auto object-contain" />
            </Link>
          </div>

          <nav className="hidden md:flex gap-8">
            <Link href="/#guidelines" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Guidelines
            </Link>
            <Link href="/devices" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Devices
            </Link>
            <Link href="/payouts" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Payouts
            </Link>
            <Link href="/#community" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-[15px] font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              Log In
            </Link>
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-black px-5 text-[15px] font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Apply as Creator
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-12">
        {/* Section 1: The Payout Tiers */}
        <section className="px-6 lg:px-8 py-12 lg:py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
              Clear, transparent payouts.
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto font-light">
              We pay top market rates for high-quality spatial video data. Choose your path based on your environment and equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Everyday Environments */}
            <div className="group rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-50 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img 
                  src="/payout_everyday.png" 
                  alt="Everyday household tasks" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-3">
                    <Activity className="w-4 h-4" /> Everyday Environments
                  </div>
                  <div className="text-3xl font-medium text-white">$0.15 <span className="text-lg text-zinc-300 font-normal">per video</span></div>
                  <div className="text-emerald-400 font-medium text-sm mt-1">~$6.00/hour batch rate</div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-zinc-600 leading-relaxed text-lg">
                  For standard household and office tasks. Folding laundry, cooking meals, opening doors, and moving items. High volume, easy to collect.
                </p>
              </div>
            </div>

            {/* Card 2: Specialized Industrial */}
            <div className="group rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-50 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                  alt="Industrial machinery" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Grid for tech feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff22_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff22_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-3">
                    <Cpu className="w-4 h-4" /> Specialized Industrial
                  </div>
                  <div className="text-3xl font-medium text-white">$0.40 - $0.75 <span className="text-lg text-zinc-300 font-normal">per video</span></div>
                  <div className="text-cyan-400 font-medium text-sm mt-1">~$15.00 - $25.00/hour batch rate</div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-zinc-600 leading-relaxed text-lg">
                  For complex manufacturing and workstation tasks. Sewing machines, power tools, soldering, and technical assembly. Requires higher precision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The QA Gatekeeper */}
        <section className="bg-zinc-50 border-y border-zinc-100 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-zinc-500">
                QUALITY ASSURANCE
              </div>
              <h2 className="text-3xl md:text-5xl font-medium text-black text-balance">
                Zero Tolerance QA Pipeline
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto mt-6">
                Don't guess if your video is good enough. Our automated QA gives you instant feedback.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Pass ✅ */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-zinc-200 relative overflow-hidden group">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-emerald-50 border border-emerald-200 shadow-lg rounded-full px-4 py-2 w-max max-w-[90%]">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-sm font-medium text-emerald-800 truncate">[Status: Verified] + $0.15 Credited</span>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video relative bg-zinc-100">
                   <img 
                      src="https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&w=800&q=80" 
                      alt="Clear image grasp" 
                      className="w-full h-full object-cover"
                   />
                </div>
              </div>

              {/* Fail ❌ */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-zinc-200 relative overflow-hidden group">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-rose-50 border border-rose-200 shadow-lg rounded-full px-4 py-2 w-max max-w-[90%]">
                  <X className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-sm font-medium text-rose-800 truncate">[Status: Rejected] QA_ERR_MOTION_BLUR</span>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video relative bg-zinc-100">
                   <img 
                      src="https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&w=800&q=80" 
                      alt="Blurry image grasp" 
                      className="w-full h-full object-cover blur-[6px] brightness-[0.6] scale-110 -rotate-3"
                   />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How You Get Paid */}
        <section className="py-20 lg:py-28 px-6 lg:px-8 bg-white max-w-6xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-5xl font-medium text-black text-balance">
              How the Money Moves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-zinc-50 border border-zinc-200 rounded-[1.25rem] flex items-center justify-center text-black mb-6 shadow-sm">
                 <Wallet className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">Instant Ledger Updates</h3>
              <p className="text-zinc-600 leading-relaxed">
                Watch your funds clear milliseconds after a video passes QA. Your balance ticks upward in real-time.
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-zinc-50 border border-zinc-200 rounded-[1.25rem] flex items-center justify-center text-black mb-6 shadow-sm">
                 <LayoutGrid className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">$10 Minimum Threshold</h3>
              <p className="text-zinc-600 leading-relaxed">
                Fast, accessible withdrawals without waiting weeks to hit high minimums. Access your cash sooner.
              </p>
            </div>

            {/* Column 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-zinc-50 border border-zinc-200 rounded-[1.25rem] flex items-center justify-center text-black mb-6 shadow-sm">
                 <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-black mb-4">Weekly Friday Sweeps</h3>
              <p className="text-zinc-600 leading-relaxed">
                Automated direct deposits to your bank, debit card, or PayPal via Stripe Connect.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Verified Node Gamification */}
        <section className="py-12 lg:py-20 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-zinc-950 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-emerald-900/20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="order-2 md:order-1">
                <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-cyan-400">
                  ACHIEVEMENT UNLOCKED
                </div>
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 text-balance">
                  Verified Node Status
                </h2>
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                  Maintain a 90% QA acceptance rate across 500+ videos to unlock permanent bounty multipliers and priority server processing.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-zinc-200 font-medium bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
                    <span>+20% Bounty Bonus on all videos</span>
                  </li>
                  <li className="flex items-center gap-4 text-zinc-200 font-medium bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
                    <span>Instant priority processing</span>
                  </li>
                  <li className="flex items-center gap-4 text-zinc-200 font-medium bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
                    <span>Access to exclusive Industrial tasks</span>
                  </li>
                </ul>
              </div>

              <div className="order-1 md:order-2 flex justify-center items-center py-8">
                {/* CSS Hexagon Badge */}
                <div className="relative w-64 h-64 flex items-center justify-center hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-cyan-500/30 blur-[40px] rounded-full animate-pulse"></div>
                  <div className="relative z-10 w-48 h-48 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-[2rem] rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] border-2 border-cyan-300/50 backdrop-blur-xl">
                    <div className="w-[11rem] h-[11rem] bg-zinc-950 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                      <div className="-rotate-45 flex flex-col items-center justify-center">
                        <img src="/logo.png" alt="Dave Logo" className="h-16 w-auto object-contain mb-2 opacity-90 invert brightness-0 saturate-100" style={{ filter: "brightness(0) invert(1)" }} />
                        <BadgeCheck className="w-8 h-8 text-cyan-400 mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          {/* Top Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Platform</h4>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Creator App</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Weekly Payouts</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Task Board</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Equipment Guide</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Use Cases</h4>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Smart Glasses</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Action Cameras</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Mobile Devices</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Dashcams</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Company</h4>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Careers</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Support Center</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Creator Community</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Legal</h4>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Upload Guidelines</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Data Ethics</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Huge Statement */}
          <div className="mb-24 md:mb-40">
            <h1 className="text-[11vw] leading-[0.95] font-medium tracking-tight text-white mb-4">
              Real-world data<br/>collected by<br/>everyday people.
            </h1>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-zinc-800 pt-8">
            <div className="flex gap-3">
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-md bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                 <span className="font-bold font-sans text-sm">in</span>
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-md bg-[#1a1a1a] text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                 <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.936H5.045z"></path></svg>
              </a>
            </div>
            <div className="flex flex-col md:text-right gap-3">
              <a href="#" className="text-[10px] md:text-[11px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
                Manage your cookie preferences
              </a>
              <div className="text-[10px] md:text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                Copyright © 2026 Dave, Inc. All rights reserved. <Link href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 hover:decoration-white">Terms of Use</Link> & <Link href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 hover:decoration-white">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
