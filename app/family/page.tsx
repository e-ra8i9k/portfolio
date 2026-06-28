'use client'

import { motion } from 'framer-motion'
import { Lock, ShieldAlert } from 'lucide-react'

export default function Family() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full space-y-12"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance">
            My <span className="text-gradient-red">Family</span>
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative glass-dark overflow-hidden p-12 md:p-16 text-center space-y-6 min-h-[420px] flex flex-col items-center justify-center"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_40px_rgba(255,45,85,0.45)]"
          >
            <Lock className="h-12 w-12 text-white" aria-hidden="true" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-[0.2em] text-gradient-red">
            REDACTED
          </h2>
          <p className="inline-flex items-center gap-2 text-xl md:text-2xl font-semibold text-red-400">
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            NOT ALLOWED ENTRANCE
          </p>
          <p className="text-zinc-400 mt-2 text-sm md:text-base">
            This section is private and protected.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
