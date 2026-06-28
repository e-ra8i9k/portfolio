'use client'

import { motion } from 'framer-motion'

export default function Journey() {
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
        className="max-w-4xl w-full space-y-12"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance">
            My <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            14 years of experiencing life
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-dark p-8 md:p-12 space-y-6"
        >
          <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            <p>
              I made it here through 14 years of experiencing life. So far I have encountered 4 suspensions:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>2 by fights</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>1 by involvement of substances (I didn&apos;t get included - I was in the bathroom at the wrong time)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>The last one was because I cussed out a teacher</span>
              </li>
            </ul>
            <p className="mt-6">
              I have been to <span className="text-red-500 font-semibold">6 different schools</span>. Each experience taught me something valuable about resilience, growth, and who I am as a person.
            </p>
            <p>
              These challenges didn&apos;t break me—they built me. I&apos;ve learned to handle pressure, stand by my convictions, and move forward even when things get tough.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Schools Attended', value: '6' },
            { label: 'Suspensions', value: '4' },
            { label: 'Years of Life', value: '14' },
            { label: 'Lessons Learned', value: '∞' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-dark p-6 text-center hover:border-blue-500/50 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-400">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
