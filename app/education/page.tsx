'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

export default function Education() {
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
            My <span className="text-gradient">Education</span>
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-dark p-10 md:p-14 text-center"
        >
          <div className="space-y-5 flex flex-col items-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.45)]">
              <GraduationCap className="h-10 w-10 text-white" aria-hidden="true" />
            </span>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Entering 9th Grade
            </p>
            <p className="text-2xl md:text-3xl text-gradient-red font-bold">
              and uh, i&apos;m scared 😅
            </p>
            <p className="text-zinc-400 mt-2">
              please no i scared 😅😭
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
