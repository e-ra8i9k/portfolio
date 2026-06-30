'use client'

import { motion } from 'framer-motion'
import { Lock, ShieldAlert, CheckCircle2, Scale, FileText, Shield, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Family() {
  const [hoveredLaw, setHoveredLaw] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const lockVariants = {
    initial: { scale: 0.4, opacity: 0, rotate: -30 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  const laws = [
    {
      title: 'GDPR Article 8',
      description: 'Right to privacy and family life protection under EU regulations',
      icon: Shield,
    },
    {
      title: 'CCPA Section 1798',
      description: 'California Consumer Privacy Act ensures personal information control',
      icon: Scale,
    },
    {
      title: 'Common Law Privacy',
      description: 'Fundamental right to privacy without government interference',
      icon: FileText,
    },
    {
      title: 'Data Protection',
      description: 'Consent-based access to sensitive personal and family information',
      icon: Lock,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full space-y-14 relative z-10"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            className="flex justify-center mb-8"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              variants={lockVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.15)',
                    '0 0 40px rgba(239, 68, 68, 0.5), 0 0 80px rgba(239, 68, 68, 0.25)',
                    '0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl"
              />

              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 to-red-900 relative z-10 border border-red-400/30"
              >
                <Lock className="h-12 w-12 text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-black text-white mb-3 text-center tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            My <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Family</span>
          </motion.h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative group"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

          <div className="relative bg-black/40 backdrop-blur-lg border border-red-500/10 group-hover:border-red-500/25 rounded-2xl overflow-hidden p-12 md:p-16 text-center space-y-6 transition-all duration-300">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <motion.div
              className="flex justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShieldAlert className="h-8 w-8 text-red-500" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black tracking-widest bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              REDACTED
            </h2>

            <p className="text-xl md:text-2xl font-semibold text-red-400">
              NOT ALLOWED ENTRANCE
            </p>

            <p className="text-zinc-500 text-base leading-relaxed max-w-xl mx-auto">
              This section is private and protected by law. Access requires explicit consent.
            </p>

            <motion.div
              className="w-12 h-12 border-2 border-red-500/30 rounded-full mx-auto mt-4"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-8">
          <motion.div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Scale className="h-7 w-7 text-red-500" />
              Legal Protection
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {laws.map((law, index) => {
              const IconComponent = law.icon
              return (
                <motion.div
                  key={index}
                  onHoverStart={() => setHoveredLaw(index)}
                  onHoverEnd={() => setHoveredLaw(null)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/40 to-red-700/40 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

                  <motion.div
                    className="relative bg-red-950/10 backdrop-blur-md border border-red-500/10 group-hover:border-red-500/30 rounded-xl p-6 space-y-4 transition-all duration-300"
                    animate={{
                      boxShadow: hoveredLaw === index
                        ? '0 15px 30px rgba(239, 68, 68, 0.25)'
                        : '0 0 0px rgba(239, 68, 68, 0)'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ scale: hoveredLaw === index ? 1.15 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      </motion.div>
                      <div className="text-left">
                        <h4 className="text-lg font-bold text-red-400 group-hover:text-red-300 transition-colors">
                          {law.title}
                        </h4>
                        <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors mt-2 leading-relaxed">
                          {law.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 text-red-500/70 group-hover:text-red-400 text-xs font-semibold pt-2"
                      animate={{ x: hoveredLaw === index ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                      Active Protection
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

            <motion.div
              className="relative bg-red-950/5 backdrop-blur-md border border-red-500/10 group-hover:border-red-500/20 rounded-xl p-8 space-y-4 transition-all duration-300"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <div className="flex gap-4 items-start">
                <Zap className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <p className="font-semibold text-red-300 mb-2">Privacy Rights</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    My family history, personal background, and private information are protected under international law. Access requires explicit consent. No unauthorized access, storage, or distribution is permitted.
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
