'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Cake, School, FolderKanban } from 'lucide-react'

const languages = [
  { lang: 'Portuguese', text: 'Bem-vindo ao portfólio e_ra8i9k' },
  { lang: 'Russian', text: 'Добро пожаловать в портфолио e_ra8i9k' },
  { lang: 'German', text: 'Willkommen im Portfolio e_ra8i9k' },
  { lang: 'French', text: 'Bienvenue dans le portfolio e_ra8i9k' },
  { lang: 'Spanish', text: 'Bienvenido al portafolio e_ra8i9k' },
  { lang: 'English', text: 'Welcome to e_ra8i9k portfolio' },
]

export default function Home() {
  const [currentLang, setCurrentLang] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length)
      setDisplayText('')
      setIsTyping(true)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isTyping && currentLang < languages.length) {
      const timer = setTimeout(() => {
        setIsTyping(true)
      }, 2000)
      return () => clearTimeout(timer)
    }

    if (isTyping) {
      const fullText = languages[currentLang].text
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [isTyping, currentLang])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full space-y-12"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available · Online
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight min-h-[1.2em] text-balance">
            <span className="text-gradient">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-red-500"
            >
              |
            </motion.span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base font-mono">
            {languages[currentLang].lang}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-dark p-8 md:p-12 space-y-6"
        >
          <h2 className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_22px_rgba(255,45,85,0.4)]">
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed text-pretty">
            <p>
              Hi, I won&apos;t be sharing my name! But I am 14 and I made this portfolio so that anyone who follows me can view this and get more info about me. If I am not who they wanted, then they can unfollow me.
            </p>
            <p>
              I&apos;m passionate about building things that work seamlessly. I create tools and scripts that help make gaming and development experiences smoother and more enjoyable for others.
            </p>
            <p>
              Through the years, I&apos;ve learned resilience, adaptability, and the importance of hard work. Every challenge has shaped who I am today, and I&apos;m excited about what&apos;s next.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { label: 'Age', value: '14', icon: Cake },
            { label: 'Schools', value: '6', icon: School },
            { label: 'Projects', value: '2+', icon: FolderKanban },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="glass-dark p-5 md:p-6 text-center transition-colors duration-300 hover:border-red-500/30"
              >
                <Icon className="mx-auto h-5 w-5 text-red-400" aria-hidden="true" />
                <p className="mt-3 text-3xl md:text-4xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
