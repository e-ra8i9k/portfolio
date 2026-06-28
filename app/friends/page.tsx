'use client'

import { motion } from 'framer-motion'
import { Crown, Shield, Dumbbell, Sparkles, Gamepad2, Flame, Wind, type LucideIcon } from 'lucide-react'

type Friend = {
  number: number
  names: string
  description: string
  icon: LucideIcon
}

const friends: Friend[] = [
  {
    number: 1,
    names: 'João/Danthy/E\'',
    description: 'João has always been there for me. Even when the time I got threatened to be doxxed, he stuck with me and came along with all my challenges for this past year. He is a really nice bro, and he is amazing. Our friendship has built to a strong bond. He has admitted to me that he considers me as his own brother and that he would do anything for me.',
    icon: Crown,
  },
  {
    number: 2,
    names: 'John',
    description: 'Me and John met on Roblox and we played a lot of shooter games—not average ones, but we got along very fast. We made stupid decisions and said we\'re gonna do this and that which were very bad attacks in theory, however we didn\'t commit them. We switched and converted to something useful and we actually became more stable and mature. Now me and him sit at a good standing.',
    icon: Shield,
  },
  {
    number: 3,
    names: 'Nikolas',
    description: 'Nikolas has been a great friend. Even though during 8th there wasn\'t much talking, during 7th those were good years. Me and him planned on moving to Spain at 16. However I don\'t think that is happening at all. But we were younger and not thinking.',
    icon: Dumbbell,
  },
  {
    number: 4,
    names: 'Gracelyn',
    description: 'Gracelyn is a very nice friend. Maybe at first I thought she was a bitch, but she was nice. However I did not like her at first because she kept trying to push me out of my comfort zone and talk to me. Eventually it worked, and she is a great friend. She knows what to do in certain types of situations. The only odd thing about her is that she literally knows everyone on TikTok or Instagram from school, but I don\'t care. That\'s how I figured out my crushes Insta! Gracelyn is a great friend!',
    icon: Sparkles,
  },
  {
    number: 5,
    names: 'Aiden',
    description: 'Aiden is such a great friend with whom we have a strong bond. We play a lot of games together and we call a lot. We have some ups and downs, but they\'re usually resolved quickly. I have so many footages of Aiden doing stuff and screenshots of him. Overall it is good vibes with him.',
    icon: Gamepad2,
  },
  {
    number: 6,
    names: 'Ty/Scr',
    description: 'Ty is a good friend. We bonded over Discord and he hooked me on the method of Fetch Rewards where you earn points to cash out anything. The fact that it is legit is even crazier, so I deeply appreciate him for that. Even though we get freaky 😉🤫',
    icon: Flame,
  },
  {
    number: 7,
    names: 'Snow',
    description: 'He is just a good friend that has a lot to offer. He even plans on selling his Discord server to me. He is just a chill guy and overall nice and understanding.',
    icon: Wind,
  },
]

export default function Friends() {
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
            My <span className="text-gradient">Friends</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            People who mean the world to me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {friends.map((friend) => {
            const Icon = friend.icon
            return (
              <motion.div
                key={friend.number}
                variants={itemVariants}
                className="glass-dark p-6 md:p-8 transition-colors duration-300 hover:border-red-500/30 group"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/90 to-red-700 shadow-[0_0_22px_rgba(255,45,85,0.35)] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">#{friend.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {friend.names}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {friend.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div variants={itemVariants} className="glass-dark p-8 text-center">
          <p className="text-zinc-400 italic">
            &quot;True friends are the family we choose for ourselves.&quot;
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
