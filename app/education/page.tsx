'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Percent, Sparkles, Brain, Zap } from 'lucide-react'

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
            <motion.span
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.45)]"
            >
              <GraduationCap className="h-10 w-10 text-white" aria-hidden="true" />
            </motion.span>
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

        <motion.div
          variants={itemVariants}
          className="relative group"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

          <div className="relative glass-dark rounded-2xl overflow-hidden p-10 md:p-14 text-center space-y-8 border border-blue-500/10 group-hover:border-blue-500/25 transition-colors duration-300">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <motion.div
              className="flex justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Award className="h-9 w-9 text-blue-400" strokeWidth={1.5} />
            </motion.div>

            <div className="space-y-2">
              <p className="text-zinc-400 text-sm font-semibold tracking-widest uppercase">
                Attending
              </p>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                ABHS or ABCS
              </h2>
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="inline-flex flex-col items-center gap-2 rounded-2xl bg-blue-950/30 border border-blue-500/20 px-10 py-6"
            >
              <div className="flex items-center gap-2 text-blue-400">
                <Percent className="h-5 w-5" strokeWidth={2} />
                <span className="text-sm font-bold tracking-wide uppercase">
                  Acceptance Rate
                </span>
              </div>
              <motion.p
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl font-black text-white"
              >
                33%
              </motion.p>
            </motion.div>

            <motion.p
              className="inline-flex items-center gap-2 text-lg md:text-xl font-semibold text-blue-300"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5" strokeWidth={2} />
              ig am lucky to be here
            </motion.p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

            <motion.div
              className="relative glass-dark rounded-xl p-8 space-y-4 border border-blue-500/10 group-hover:border-blue-500/20 transition-colors duration-300"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <div className="flex gap-4 items-start">
                <Brain className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" strokeWidth={2} />
                <div className="text-left">
                  <p className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    Honest Self Assessment
                    <Zap className="h-4 w-4" strokeWidth={2} />
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    I&apos;m pretty smart when it comes to actually doing stuff, but I&apos;d rather not do work lol
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
