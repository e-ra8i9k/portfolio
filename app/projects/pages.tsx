'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Shield,
  Boxes,
  Zap,
  Gamepad2,
  Lock,
  Eye,
  X,
  Sparkles,
  Layers,
  Activity,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full space-y-10"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            What I&apos;m building
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white text-balance">
            <span className="text-gradient">My</span> Projects
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl text-pretty">
            Tools and systems I design and ship to make gaming and scripting
            seamless, safe, and a little more powerful for everyone.
          </p>
        </motion.div>

        <motion.article
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="glass-dark overflow-hidden p-8 md:p-10 transition-colors duration-300 hover:border-red-500/30"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex items-center justify-center h-20 w-20 flex-shrink-0 rounded-3xl bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_30px_rgba(255,45,85,0.45)]">
              <Boxes className="h-10 w-10 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold text-white">Proton Hub</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                  Active
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-pretty">
                A carefully designed script hub built to make playing games
                seamless. Proton Hub brings every script you need into one
                clean, fast interface — no clutter, no friction. Browse, search,
                and launch with a single tap, while a polished UI keeps the whole
                experience feeling premium and effortless.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Zap, label: 'Lightning fast launching' },
                  { icon: Layers, label: 'All scripts, one place' },
                  { icon: Gamepad2, label: 'Built for gamers' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3"
                  >
                    <Icon className="h-4 w-4 text-red-400" aria-hidden="true" />
                    <span className="text-sm text-zinc-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        <motion.article
          variants={itemVariants}
          className="glass-dark overflow-hidden p-8 md:p-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-16 w-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.45)]">
                  <ShieldCheck className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Aasim Protector</h2>
                  <p className="text-sm text-blue-400">Script protection, done right</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed text-pretty">
                Aasim Protector shields scripts from skidders and makes sure
                you stay safe. It wraps your code in a secure layer, blocks
                leeching attempts, and lets owners drop a custom message for
                anyone snooping around the source.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Shield, label: 'Anti-skid protection layer' },
                  { icon: Eye, label: 'Mock and message source-snoopers' },
                  { icon: Lock, label: 'Keeps you and your scripts safe' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-zinc-300">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15">
                      <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-[360px] flex-shrink-0">
              <ProtectorPreview />
            </div>
          </div>
        </motion.article>

        <motion.div
          variants={itemVariants}
          className="glass-dark p-8 text-center"
        >
          <p className="text-zinc-400">
            More projects are in the works — always building something new.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ProtectorPreview() {
  return (
    <div className="relative rounded-[1.75rem] border border-blue-500/20 bg-gradient-to-b from-[#0a1020] to-[#05080f] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-grid opacity-60" />
      <div className="relative space-y-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-400">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          AASIM PROTECTOR
        </span>

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            <ShieldCheck className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Testing V5</h3>
          <p className="text-sm text-zinc-300">
            This script is protected by{' '}
            <span className="font-bold text-white">Aasim Protector</span>.
          </p>
          <p className="font-mono text-xs text-blue-400/80 break-all">
            MsoVgX3nGYwgWpcxQiognIyWdStQvL1lQw9a
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
          <p className="text-sm leading-relaxed text-zinc-300">
            Hi, this is a custom message area from the owner. This can be used
            to mock a user trying to see the source! Or it can say join the
            Discord for the script — whatever intent of protection they want.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Exit page
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.5)] transition-transform hover:scale-[1.02]"
          >
            <Shield className="h-4 w-4" aria-hidden="true" />
            Wanna use?
          </button>
        </div>

        <p className="text-xs text-zinc-500">Powered by Aasim Protector · v1</p>
      </div>
    </div>
  )
}
