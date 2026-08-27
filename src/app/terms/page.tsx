"use client";

import React from "react";
import { LandingNavbar } from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />

      <main className="pt-32 pb-24">
        <section className="px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-mono uppercase tracking-widest mb-8">
              Last Updated: August 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-black mb-8">
              Terms of Service
            </h1>
            <p className="text-xl text-zinc-600 font-light leading-relaxed">
              Welcome to Dave. By accessing or using our platform, you agree to be bound by these terms. Please read them carefully.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-zinc prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-black hover:prose-a:text-zinc-600 prose-p:font-light prose-p:leading-relaxed"
          >
            <h2 className="text-3xl font-medium tracking-tight mt-16 mb-6">1. Acceptance of Terms</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              By creating an account and participating as a data contributor on the Dave platform, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our services.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">2. Eligibility</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              You must be at least 18 years old to use the platform. By registering an account, you represent and warrant that you meet this age requirement and that all information provided during registration is accurate and complete.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">3. Data Contribution & Licensing</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              When you submit spatial data (including video, audio, and sensor logs) to our platform, you grant Dave a worldwide, irrevocable, non-exclusive, royalty-free license to use, process, modify, anonymize, and distribute that data for the purposes of AI training and research. You confirm that you have the necessary rights and permissions to submit this data.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">4. Compensation & Payouts</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              Contributors are compensated based on the quality, quantity, and specific requirements of the data submitted. Payouts are processed weekly. Dave reserves the right to reject data that does not meet our quality standards or violates our Upload Guidelines. Rejected data is not eligible for compensation.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">5. Code of Conduct</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              You agree not to submit data that:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 font-light space-y-2">
              <li>Violates any laws or regulations.</li>
              <li>Infringes on the privacy or intellectual property rights of others.</li>
              <li>Is intentionally falsified, misleading, or inappropriate.</li>
            </ul>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              Violation of these rules may result in immediate account termination and forfeiture of unpaid earnings.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">6. Limitation of Liability</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              Dave provides the platform "as is". We shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the platform or your activities while collecting data.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">7. Modifications to Terms</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              We may update these terms from time to time. We will notify users of significant changes. Continued use of the platform after updates constitutes acceptance of the revised terms.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
