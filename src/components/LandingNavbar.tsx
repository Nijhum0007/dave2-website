"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const LandingNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Close menu if open on scroll
      if (isMenuOpen && currentScrollY > 10) {
        setIsMenuOpen(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Force close mobile menu if resized to desktop screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Guidelines", href: "/guidelines" },
    { name: "Devices", href: "/devices" },
    { name: "Payouts", href: "/payouts" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-zinc-100 transition-transform duration-300 backdrop-blur-md ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img src="/logo.png" alt="Dave Logo" className="h-24 w-auto object-contain cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors pb-1 ${
                    isActive
                      ? "text-black font-bold border-b-2 border-black"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-[15px] font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
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

          {/* Mobile Menu Trigger & CTA Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 text-xs font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              Apply
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        <div
          className={`absolute left-0 right-0 z-40 px-4 transition-all duration-300 ease-out md:hidden ${
            isMenuOpen
              ? "top-20 opacity-100 pointer-events-auto translate-y-0"
              : "top-16 opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          <div className="rounded-2xl border border-zinc-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center py-2 text-base font-medium rounded-lg px-3 transition-colors ${
                      isActive
                        ? "bg-zinc-100 text-black font-semibold"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-black"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-zinc-100 my-2" />

              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full h-11 rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                Log In
              </Link>
              <Link
                href="/apply"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full h-11 rounded-lg bg-black text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Apply as Creator
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Background Blur Overlay for Mobile Menu */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-30 bg-zinc-950/20 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};
