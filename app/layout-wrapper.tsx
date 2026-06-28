'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home,
  FolderKanban,
  Route,
  Users,
  Lock,
  GraduationCap,
  Gamepad2,
  type LucideIcon,
} from 'lucide-react'
import MusicPlayer from './music-player'

type NavItem = {
  name: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Journey', href: '/journey', icon: Route },
  { name: 'Friends', href: '/friends', icon: Users },
  { name: 'Family', href: '/family', icon: Lock },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Hobbies', href: '/hobbies', icon: Gamepad2 },
]

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] bg-red-700/25 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/5 w-[26rem] h-[26rem] bg-blue-700/20 rounded-full blur-[120px] animate-float [animation-delay:2s]" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-red-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black" />
      </div>

      <main className="relative z-10 pb-52">{children}</main>

      <MusicPlayer />

      <motion.nav
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md px-2"
      >
        <div className="glass relative overflow-hidden rounded-[1.75rem] p-1.5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[1.75rem] bg-gradient-to-b from-white/10 to-transparent" />

          <div
            ref={scrollRef}
            className="no-scrollbar relative flex items-center gap-1.5 overflow-x-auto scroll-smooth"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  ref={isActive ? activeRef : undefined}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative flex-shrink-0 outline-none"
                >
                  <motion.div
                    whileTap={{ scale: 0.92 }}
                    className={`relative flex items-center justify-center gap-2 rounded-full px-4 py-3 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActivePill"
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-[0_0_22px_rgba(255,45,85,0.55)]"
                        transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                      />
                    )}
                    <Icon
                      className="relative z-10 h-5 w-5"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        className="relative z-10 overflow-hidden whitespace-nowrap text-sm font-semibold"
                      >
                        {item.name}
                      </motion.span>
                    )}
                    <span className="sr-only">{item.name}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  )
}
