import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Top Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Platform</h4>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Creator App <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="/payouts" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Weekly Payouts
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Task Board <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Equipment Guide <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Use Cases</h4>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Smart Glasses <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Action Cameras <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Mobile Devices <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Dashcams <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Company</h4>
            <Link href="/about" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Careers <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Support Center <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Legal</h4>
            <Link href="/guidelines" className="text-[15px] text-zinc-300 hover:text-white transition-colors">
              Upload Guidelines
            </Link>
            <Link href="#" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Data Ethics <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider bg-white/10 text-white/70 px-1.5 py-0.5 rounded-sm">Soon</span>
            </Link>
            <Link href="/terms" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="group flex items-center gap-2 text-[15px] text-zinc-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
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
            <a href="mailto:hello@sonictch.com" className="flex items-center justify-center rounded-md bg-[#1a1a1a] px-4 py-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors text-sm font-medium">
              Email Us
            </a>
          </div>
          <div className="flex flex-col md:text-right gap-3">
            <a href="#" className="text-[10px] md:text-[11px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
              Manage your cookie preferences
            </a>
            <div className="text-[10px] md:text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Copyright © 2026 Sonic Technologies, Inc. All rights reserved. <Link href="/terms" className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 hover:decoration-white">Terms of Use</Link> & <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 hover:decoration-white">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
