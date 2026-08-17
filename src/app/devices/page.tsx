"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Gauge, MonitorPlay, Activity, Focus, CheckCircle2, XCircle } from "lucide-react";

export default function DevicesPage() {
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
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png" alt="Dave Logo" className="h-24 w-auto object-contain cursor-pointer" />
            </Link>
          </div>

          <nav className="hidden md:flex gap-8">
            <Link href="/#guidelines" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Guidelines
            </Link>
            <Link href="/devices" className="text-[15px] font-bold text-black transition-colors border-b-2 border-black pb-1">
              Devices
            </Link>
            <Link href="/payouts" className="text-[15px] font-medium text-zinc-800 hover:text-black transition-colors">
              Payouts
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
              href="/apply"
              className="inline-flex h-10 items-center justify-center rounded-md bg-black px-5 text-[15px] font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Apply as Creator
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Section 1: The Baseline Specs (Hero Section) */}
        <section className="px-4 md:px-6">
          <div className="relative mx-auto max-w-[1400px] rounded-[1.5rem] overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col justify-center min-h-[600px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/devices_nature_wide.png)' }}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 w-full">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-medium text-white text-balance mb-6">
                  Minimum Hardware Requirements
                </h1>
                <p className="text-lg text-zinc-300 max-w-2xl mx-auto drop-shadow-md">
                  To ensure high-quality data collection, all approved devices must meet these baseline specifications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center shadow-xl">
                  <div className="h-16 w-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 backdrop-blur-lg">
                    <Gauge className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">60 FPS Minimum</h3>
                  <p className="text-sm text-zinc-300">Prevents micro-movement data loss during fast actions.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center shadow-xl">
                  <div className="h-16 w-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 backdrop-blur-lg">
                    <MonitorPlay className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">1080p Resolution</h3>
                  <p className="text-sm text-zinc-300">4K accepted and auto-downsampled for processing.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center shadow-xl">
                  <div className="h-16 w-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 backdrop-blur-lg">
                    <Activity className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Internal IMU</h3>
                  <p className="text-sm text-zinc-300">Hardware gyroscope and accelerometer required.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center shadow-xl">
                  <div className="h-16 w-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 backdrop-blur-lg">
                    <Focus className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">120°+ FOV</h3>
                  <p className="text-sm text-zinc-300">Target and hands must remain in frame at all times.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Supported Hardware Tiers */}
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white border-b border-zinc-200">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16 lg:mb-24">
              <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-zinc-500">
                SUPPORTED DEVICES
              </div>
              <h2 className="text-4xl md:text-5xl font-medium text-black text-balance">
                Hardware Tiers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Tier 1 */}
              <div>
                <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-100 border border-zinc-200 relative shadow-sm">
                  <img src="/enterprise_rgbd_camera.png" alt="Enterprise RGB-D Camera" className="object-cover w-full h-full" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-white border border-zinc-200 text-black text-xs font-semibold tracking-wide uppercase mb-3">
                  Tier 1
                </div>
                <h3 className="text-2xl font-medium text-black mb-3">Enterprise RGB-D</h3>
                <p className="text-zinc-500 text-[15px] leading-relaxed mb-4">
                  For research labs and zero-fail data farming. Captures perfect hardware-synced depth.
                </p>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-1">Accepted Devices:</h4>
                  <p className="text-sm text-zinc-600">Intel RealSense D435i/D455, OAK-D Pro</p>
                </div>
              </div>

              {/* Tier 2 */}
              <div>
                <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-100 border border-zinc-200 relative shadow-sm">
                  <img src="/consumer_meta_glasses.png" alt="Consumer AR & LiDAR" className="object-cover w-full h-full" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-white border border-zinc-200 text-black text-xs font-semibold tracking-wide uppercase mb-3">
                  Tier 2
                </div>
                <h3 className="text-2xl font-medium text-black mb-3">Consumer AR & LiDAR</h3>
                <p className="text-zinc-500 text-[15px] leading-relaxed mb-4">
                  For scalable collection using advanced spatial consumer electronics.
                </p>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-1">Accepted Devices:</h4>
                  <p className="text-sm text-zinc-600">Apple Vision Pro, Meta Quest 3, Meta Ray-Ban Glasses, iPhone 14/15/16 Pro (Requires custom sensor-logging app)</p>
                </div>
              </div>

              {/* Tier 3 */}
              <div>
                <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-100 border border-zinc-200 relative shadow-sm">
                  <img src="/action_camera.png" alt="Action Cameras" className="object-cover w-full h-full" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-white border border-zinc-200 text-black text-xs font-semibold tracking-wide uppercase mb-3">
                  Tier 3
                </div>
                <h3 className="text-2xl font-medium text-black mb-3">Action Cameras</h3>
                <p className="text-zinc-500 text-[15px] leading-relaxed mb-4">
                  For general contributors. Requires absolutely perfect LED lighting to compensate for software-estimated depth.
                </p>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-1">Accepted Devices:</h4>
                  <p className="text-sm text-zinc-600">GoPro Hero 11/12, DJI Osmo Action 4</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The "Do's and Don'ts" of Rigging (Visual Guide) */}
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <div className="text-xs leading-6 tracking-[1px] mb-4 uppercase font-mono text-zinc-500">
                VISUAL GUIDE
              </div>
              <h2 className="text-4xl md:text-5xl font-medium text-black text-balance mb-6">
                The "Do's and Don'ts" of Rigging
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Bad rigging ruins good hardware. Follow these critical guidelines to ensure your data is accepted and you get paid.
              </p>
            </div>

            <div className="space-y-24">
              {/* Rule 1 */}
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-black mb-8 border-b border-zinc-100 pb-4">Rule 1: Rigid Mounting</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Correct */}
                  <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                      <span className="font-semibold text-black">Correct</span>
                    </div>
                    <div className="aspect-[4/3] w-full relative">
                      <img src="/correct_rigid_mount.png" alt="Correct rigid mount" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-700">A hard-plastic, tightly cinched chest harness with a camera perfectly level.</p>
                    </div>
                  </div>
                  {/* Incorrect */}
                  <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-black" />
                      <span className="font-semibold text-black">Incorrect</span>
                    </div>
                    <div className="aspect-[4/3] w-full relative">
                      <img src="/incorrect_rigid_mount.png" alt="Incorrect rigid mount" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-700">A camera hanging loosely from a fabric lanyard or clipped loosely to a t-shirt collar.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rule 2 */}
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-black mb-8 border-b border-zinc-100 pb-4">Rule 2: Egocentric POV</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Correct */}
                  <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                      <span className="font-semibold text-black">Correct</span>
                    </div>
                    <div className="aspect-[4/3] w-full relative">
                      <img src="/correct_egocentric_pov.png" alt="Correct egocentric pov" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-700">Camera mounted on the forehead or upper chest, looking directly down at hands interacting with an object.</p>
                    </div>
                  </div>
                  {/* Incorrect */}
                  <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-black" />
                      <span className="font-semibold text-black">Incorrect</span>
                    </div>
                    <div className="aspect-[4/3] w-full relative">
                      <img src="/incorrect_egocentric_pov.png" alt="Incorrect egocentric pov" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-700">A camera sitting on a tripod in the corner of a room pointing at the person.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rule 3 */}
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-black mb-8 border-b border-zinc-100 pb-4">Rule 3: Lighting</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Correct */}
                  <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                      <span className="font-semibold text-black">Correct</span>
                    </div>
                    <div className="aspect-[4/3] w-full relative">
                      <img src="/correct_lighting.png" alt="Correct lighting" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-700">A brightly lit kitchen or workshop with massive, even LED panels. Sharp shadows, high contrast.</p>
                    </div>
                  </div>
                  {/* Incorrect */}
                  <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                    <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-black" />
                      <span className="font-semibold text-black">Incorrect</span>
                    </div>
                    <div className="aspect-[4/3] w-full relative">
                      <img src="/incorrect_lighting.png" alt="Incorrect lighting" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-700">A dim, moody room lit only by a window or a single warm lamp.</p>
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
              Real-world data<br />collected by<br />everyday people.
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
