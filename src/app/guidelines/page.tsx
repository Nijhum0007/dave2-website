"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Zap, Camera } from "lucide-react";

export default function GuidelinesPage() {
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
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Dave Logo" className="h-24 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href="/guidelines" className="text-[15px] font-bold text-black border-b-2 border-black pb-1">
              Guidelines
            </Link>
            <Link href="/#hardware" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Devices
            </Link>
            <Link href="/#payouts" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
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

      <main className="pt-20">
        {/* Hero Section */}
        <section className="px-4 md:px-6 mt-6">
          <div className="relative mx-auto max-w-[1400px] h-[500px] md:h-[600px] rounded-[1.5rem] overflow-hidden flex items-center p-8 md:p-16 shadow-2xl">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/hero_guidelines.png)' }}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <div className="text-xs leading-6 tracking-[2px] mb-4 uppercase font-mono text-cyan-400 font-semibold">
                Creator Standards
              </div>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 text-balance leading-tight">
                Data Collection Guidelines
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed">
                Your videos train the next generation of AI. High quality data ensures you get approved faster, earn more, and build a trusted reputation.
              </p>
            </div>
          </div>
        </section>

        {/* The Golden Rules */}
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16 lg:mb-24">
              <h2 className="text-3xl md:text-5xl font-medium text-black text-balance mb-6">
                The Golden Rules of Quality
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Follow these simple directives to ensure your data is accepted every time. AI models need clear, uninterrupted, and comprehensive visual context.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Do's */}
              <div className="rounded-[2rem] bg-zinc-50 border border-zinc-100 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-black">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-medium text-black">Always Do</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-black">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-[17px] mb-1">Clear Lighting & Focus</h4>
                      <p className="text-zinc-500 text-[15px] leading-relaxed">Ensure the environment is well-lit and your camera lens is completely clean before starting.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-[17px] mb-1">Record the Entire Task</h4>
                      <p className="text-zinc-500 text-[15px] leading-relaxed">Start recording a few seconds before you begin, and wait a few seconds after finishing. AI needs the full context.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-[17px] mb-1">Keep Hands in Frame</h4>
                      <p className="text-zinc-500 text-[15px] leading-relaxed">For first-person (POV) tasks, ensure both of your hands and the object you are manipulating remain visible.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="rounded-[2rem] bg-rose-50 border border-rose-100 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-black">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-medium text-black">Never Do</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-black">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-[17px] mb-1">Edit or Trim Footage</h4>
                      <p className="text-zinc-600 text-[15px] leading-relaxed">Submit raw, unedited footage only. Cuts, trims, filters, or AI enhancements immediately disqualify the video.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-[17px] mb-1">Excessive Camera Shake</h4>
                      <p className="text-zinc-600 text-[15px] leading-relaxed">Avoid rapid, jerky head or body movements. Move smoothly and intentionally while wearing mounts or glasses.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-[17px] mb-1">Include Private Info (PII)</h4>
                      <p className="text-zinc-600 text-[15px] leading-relaxed">Never record computer screens with sensitive data, credit cards, mail with addresses, or faces of non-consenting individuals.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Hardware Tiers */}
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-zinc-50 border-t border-zinc-100">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16 lg:mb-24">
              <div className="text-xs leading-6 tracking-[2px] mb-4 uppercase font-mono text-zinc-500 font-semibold">
                Hardware Tiers
              </div>
              <h2 className="text-3xl md:text-5xl font-medium text-black text-balance mb-6">
                Supported Equipment
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
                We accept data from a wide range of devices. Different hardware tiers offer varying levels of precision and scalability, unlocking different earning potentials.
              </p>
            </div>

            <div className="space-y-12 lg:space-y-24">
              {/* Tier 1: Enterprise */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-transparent text-black text-xs font-bold uppercase tracking-wider mb-6">
                    <ShieldCheck className="h-4 w-4" /> Tier 1: Highest Precision
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium text-black mb-4">Enterprise RGB-D</h3>
                  <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                    Devices like <strong className="text-black font-semibold">Intel RealSense</strong> and <strong className="text-black font-semibold">OAK-D Pro</strong> provide unparalleled depth and spatial data. Data from these devices is highly sought after by top-tier robotics labs.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700"><strong>Focus:</strong> Zero QA rejections. Uncompromising quality.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700">Provides rich depth mapping alongside high-resolution RGB video.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700">Unlocks the highest paying, premium enterprise tasks.</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src="/hardware_enterprise.png" alt="Enterprise RGB-D Camera" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                  </div>
                </div>
              </div>

              {/* Tier 2: Consumer */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-1 lg:order-1">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src="/hardware_consumer.png" alt="Consumer AR Glasses" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                  </div>
                </div>
                <div className="order-2 lg:order-2 lg:pl-12">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-transparent text-black text-xs font-bold uppercase tracking-wider mb-6">
                    <Zap className="h-4 w-4" /> Tier 2: Maximum Scalability
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium text-black mb-4">Consumer AR & LiDAR</h3>
                  <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                    Utilize the power of modern consumer tech like <strong className="text-black font-semibold">Apple Vision Pro, Meta Glasses, or high-end iPhones</strong> (with LiDAR). Perfect for capturing vast amounts of varied, everyday data.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700"><strong>Focus:</strong> Scalability and frictionless recording.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700">Incredible for natural first-person point-of-view (POV) tasks.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700">Excellent spatial awareness leveraging built-in IMUs and sensors.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tier 3: Action */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-transparent text-black text-xs font-bold uppercase tracking-wider mb-6">
                    <Camera className="h-4 w-4" /> Tier 3: Baseline Access
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium text-black mb-4">Action Cameras</h3>
                  <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                    Rugged and reliable. Cameras like <strong className="text-black font-semibold">GoPro</strong> and <strong className="text-black font-semibold">DJI Osmo</strong> are excellent starting points for outdoor tasks or rigorous physical activities.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700"><strong>Focus:</strong> Baseline acceptable data for standard model training.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700">Requires a secure chest or head mount for stable POV capture.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700">Great for dynamic tasks like biking, running, or outdoor chores.</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src="/hardware_action.png" alt="Action Camera" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12 px-6 lg:px-8 mt-auto">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Platform</h4>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Creator App</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Weekly Payouts</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Task Board</Link>
              <Link href="/guidelines" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Equipment Guide</Link>
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
              <Link href="/guidelines" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Upload Guidelines</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Data Ethics</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-[15px] text-zinc-300 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          <div className="mb-24 md:mb-40">
            <h1 className="text-[11vw] leading-[0.95] font-medium tracking-tight text-white mb-4">
              Real-world data<br />collected by<br />everyday people.
            </h1>
          </div>

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
