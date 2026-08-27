"use client";

import React from "react";
import { LandingNavbar } from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-zinc-600 font-light leading-relaxed">
              At Dave, we take privacy seriously. This policy describes how we collect, use, and protect your personal information and the spatial data you contribute.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-zinc prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-black hover:prose-a:text-zinc-600 prose-p:font-light prose-p:leading-relaxed"
          >
            <h2 className="text-3xl font-medium tracking-tight mt-16 mb-6">1. Information We Collect</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              When you use our platform, we collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 font-light space-y-2">
              <li><strong>Account Information:</strong> Name, email address, payment details, and payout history.</li>
              <li><strong>Spatial Data:</strong> The video, audio, and sensor data (e.g., IMU, GPS) collected through your devices and submitted to our platform.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website and Creator App.</li>
            </ul>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">2. How We Use Your Data</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              Your data is used primarily to build and maintain diverse spatial datasets for AI training. Specifically, we use your information to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 font-light space-y-2">
              <li>Anonymize and process spatial data before distributing it to AI research partners.</li>
              <li>Process your weekly payouts and manage your account.</li>
              <li>Communicate with you regarding task assignments, platform updates, and support.</li>
              <li>Improve the quality and performance of our Creator App.</li>
            </ul>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">3. Privacy and Anonymization</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              We employ state-of-the-art obfuscation pipelines to protect the privacy of bystanders captured in your spatial data. This includes automatic blurring of faces, license plates, and other Personally Identifiable Information (PII) before the data is used in any training datasets.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">4. Data Sharing</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              We do not sell your personal account information. Processed, anonymized spatial data is shared with our AI research partners under strict licensing agreements. We may also share information with trusted third-party service providers (such as payment processors) who assist us in operating our platform.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">5. Your Rights</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              You have the right to access, correct, or delete your personal account information. You can also request to withdraw submitted data that has not yet been processed and distributed. To exercise these rights, please contact our support team.
            </p>

            <h2 className="text-3xl font-medium tracking-tight mt-12 mb-6">6. Contact Us</h2>
            <p className="mb-6 text-zinc-600 font-light leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:hello@sonictch.com" className="font-medium underline underline-offset-4 decoration-zinc-300 hover:decoration-black text-black">hello@sonictch.com</a>.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
