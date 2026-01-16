"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary to-indigo-600 text-white">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold leading-tight">
            Smart Doctor Appointments <br /> Without Long Queues
          </h1>

          <p className="mt-6 text-lg text-white/85">
            Book appointments, manage schedules, and reduce waiting time —
            all from one powerful platform.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-primary shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-white/40 px-7 py-3 font-semibold hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
    </section>
  )
}
