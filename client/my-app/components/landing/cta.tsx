"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function CTA() {
  return (
    <section className="bg-linear-to-r from-primary to-indigo-600 py-20 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold">
          Ready to skip hospital queues?
        </h2>

        <p className="mt-4 text-white/85">
          Join MediQueue today and experience smarter appointments.
        </p>

        <div className="mt-8">
          <Link
            href="/register"
            className="rounded-xl bg-white px-8 py-3 font-semibold text-primary shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
