'use client'

import { motion } from 'framer-motion'
import { Code2, MessageCircle, Gamepad2, UserPlus, Sparkles, type LucideIcon } from 'lucide-react'

type Hobby = {
  title: string
  description: string
  icon: LucideIcon
  accent: string
  glow: string
}

const hobbies: Hobby[] = [
  {
    title: 'Coding & Development',
    description: 'Building websites, scripts, and utility tools that help others',
    icon: Code2,
    accent: 'from-red-500 to-red-700',
    glow: 'rgba(255,45,85,0.4)',
  },
  {
    title: 'Connecting with People',
    description: 'Messaging and communicating with friends around the world',
    icon: MessageCircle,
    accent: 'from-blue-500 to-blue-700',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    title: 'Playing Roblox',
    description: 'Gaming and having fun with friends in virtual worlds',
    icon: Gamepad2,
    accent: 'from-red-500 to-red-700',
    glow: 'rgba(255,45,85,0.4)',
  },
  {
    title: 'Making Friends',
    description: 'Building meaningful connections with people online',
    icon: UserPlus,
    accent: 'from-blue-500 to-blue-700',
    glow: 'rgba(59,130,246,0.4)',
  },
]

export default function Hobbies() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
            My <span className="text-gradient">Hobbies</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Things I love to do in my free time
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {hobbies.map((hobby) => {
            const Icon = hobby.icon
            return (
              <motion.div
                key={hobby.title}
                variants={itemVariants}
                className="glass-dark p-8 transition-colors duration-300 hover:border-red-500/30 group"
                whileHover={{ y: -5 }}
              >
                <div className="space-y-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${hobby.accent} transition-transform duration-300 group-hover:scale-105`}
                    style={{ boxShadow: `0 0 24px ${hobby.glow}` }}
                  >
                    <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {hobby.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {hobby.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="glass-dark p-8 text-center">
          <p className="text-zinc-300 text-lg inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-red-400" aria-hidden="true" />
            Life is about doing what you love and sharing it with others
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
