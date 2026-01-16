"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          MediQueue
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
