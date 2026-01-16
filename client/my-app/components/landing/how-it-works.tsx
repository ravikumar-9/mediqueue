"use client"

import { motion } from "framer-motion"

const steps = [
  "Create an account",
  "Choose doctor & slot",
  "Confirm appointment",
  "Visit hospital on time",
]

export default function HowItWorks() {
  return (
    <section className="bg-muted py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold">
          How It Works
        </h2>

        <div className="mt-16 space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 rounded-xl bg-white p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                {i + 1}
              </span>
              <p className="text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
