"use client";

import React from "react";
import { LandingNavbar } from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Users, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-mono uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Our Mission
            </div>
            <h1 className="text-[11vw] md:text-7xl lg:text-8xl leading-[0.95] font-medium tracking-tight text-black mb-8">
              Building the world's most diverse spatial dataset.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-2xl leading-relaxed">
              We believe that the next generation of AI models requires data that truly reflects human experience. Dave connects everyday creators with leading AI labs to build a more capable future.
            </p>
          </motion.div>
        </section>

        {/* The Why Section */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden relative"
            >
              <img src="/dave_data_collection.jpg" alt="Dave Data Collection" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Why we exist</h2>
              <div className="space-y-6 text-lg text-zinc-600 font-light leading-relaxed">
                <p>
                  Current AI models are largely trained on scraped web data, resulting in a disconnected, two-dimensional understanding of the world. To build embodied AI that can interact with physical spaces, we need first-person, spatial data at an unprecedented scale.
                </p>
                <p>
                  Dave was founded to solve this bottleneck. We've built a platform that allows anyone with a camera to contribute to the future of AI, while being fairly compensated for their effort.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-black text-white py-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Our core values</h2>
              <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                The principles that guide how we build our platform and work with our creators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Shield, title: "Privacy First", desc: "We implement state-of-the-art blurring and PII removal before data ever reaches AI labs. We protect the privacy of bystanders and our creators." },
                { icon: Users, title: "Fair Compensation", desc: "Data is valuable, and the people who collect it should be paid fairly. We ensure our creators receive weekly, transparent payouts for their work." },
                { icon: Target, title: "Uncompromising Quality", desc: "We maintain strict quality standards to ensure the datasets we produce actually drive meaningful progress in spatial intelligence." },
                { icon: Zap, title: "Developer Velocity", desc: "We move fast and iterate quickly, giving AI researchers the data they need, when they need it, in the formats they expect." }
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-zinc-900 rounded-[2rem] p-10 lg:p-12 border border-white/5"
                >
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                    <val.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-medium mb-4">{val.title}</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="px-6 lg:px-8 max-w-7xl mx-auto py-32 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8">
            Help us map the world.
          </h2>
          <a href="/apply" className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
            Apply as creator
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
