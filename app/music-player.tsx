'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music2,
  ListMusic,
  ChevronDown,
  Shuffle,
} from 'lucide-react'

const VIDEO_IDS = [
  '_6PR870zEzM',
  'ZFWpzlsGUnc',
  'LEhTlLnOVDU',
  'a1Femq4NPxs',
  'GfxcnX7XWfg',
  'DmNfT-B7nlA',
  'URxCQrotfM8',
  '2K4-snw22h8',
  'REyv4cblksI',
  'hgOu8eRJZ3Q',
  'nAavcoe9GGo',
]

type Track = {
  id: string
  title: string
  author: string
  thumb: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

type YTPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  loadVideoById: (id: string) => void
  cueVideoById: (id: string) => void
  seekTo: (s: number, allow: boolean) => void
  setVolume: (v: number) => void
  mute: () => void
  unMute: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getVideoData: () => { title?: string; author?: string }
}

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export default function MusicPlayer() {
  const playerRef = useRef<YTPlayer | null>(null)
  const containerId = 'yt-audio-host'

  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [muted, setMuted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showList, setShowList] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const [tracks, setTracks] = useState<Track[]>(
    VIDEO_IDS.map((id, i) => ({
      id,
      title: `Track ${i + 1}`,
      author: 'YouTube',
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    })),
  )

  useEffect(() => {
    let cancelled = false

    function createPlayer() {
      if (cancelled || playerRef.current) return
      playerRef.current = new window.YT.Player(containerId, {
        height: '0',
        width: '0',
        videoId: VIDEO_IDS[0],
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (cancelled) return
            playerRef.current?.setVolume(volume)
            setReady(true)
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === 1) setIsPlaying(true)
            if (e.data === 2) setIsPlaying(false)
            if (e.data === 0) {
              setCurrent((c) => {
                const next = (c + 1) % VIDEO_IDS.length
                playerRef.current?.loadVideoById(VIDEO_IDS[next])
                return next
              })
            }
            const data = playerRef.current?.getVideoData?.()
            if (data?.title) {
              setTracks((prev) => {
                const id = prev.findIndex((t) => t.title.startsWith('Track'))
                if (id === -1) return prev
                return prev
              })
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const existing = document.getElementById('yt-iframe-api')
      if (!existing) {
        const tag = document.createElement('script')
        tag.id = 'yt-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        createPlayer()
      }
    }

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const interval = setInterval(() => {
      const p = playerRef.current
      if (!p) return
      const t = p.getCurrentTime?.() ?? 0
      const d = p.getDuration?.() ?? 0
      setProgress(t)
      setDuration(d)

      const data = p.getVideoData?.()
      if (data?.title) {
        setTracks((prev) => {
          const copy = [...prev]
          const cur = copy[current]
          if (cur && cur.title !== data.title) {
            copy[current] = {
              ...cur,
              title: data.title!,
              author: data.author || cur.author,
            }
            return copy
          }
          return prev
        })
      }
    }, 500)
    return () => clearInterval(interval)
  }, [ready, current])

  const playIndex = useCallback((index: number) => {
    playerRef.current?.loadVideoById(VIDEO_IDS[index])
    setCurrent(index)
    setHasStarted(true)
  }, [])

  const togglePlay = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    if (!hasStarted) {
      p.playVideo()
      setHasStarted(true)
      return
    }
    if (isPlaying) p.pauseVideo()
    else p.playVideo()
  }, [isPlaying, hasStarted])

  const next = useCallback(() => {
    playIndex((current + 1) % VIDEO_IDS.length)
  }, [current, playIndex])

  const prev = useCallback(() => {
    const p = playerRef.current
    if (p && p.getCurrentTime() > 3) {
      p.seekTo(0, true)
      return
    }
    playIndex((current - 1 + VIDEO_IDS.length) % VIDEO_IDS.length)
  }, [current, playIndex])

  const shuffle = useCallback(() => {
    let n = Math.floor(Math.random() * VIDEO_IDS.length)
    if (n === current) n = (n + 1) % VIDEO_IDS.length
    playIndex(n)
  }, [current, playIndex])

  const onSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value)
      playerRef.current?.seekTo(val, true)
      setProgress(val)
    },
    [],
  )

  const onVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setVolume(val)
    playerRef.current?.setVolume(val)
    if (val === 0) {
      setMuted(true)
      playerRef.current?.mute()
    } else if (muted) {
      setMuted(false)
      playerRef.current?.unMute()
    }
  }, [muted])

  const toggleMute = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    if (muted) {
      p.unMute()
      setMuted(false)
      if (volume === 0) {
        setVolume(60)
        p.setVolume(60)
      }
    } else {
      p.mute()
      setMuted(true)
    }
  }, [muted, volume])

  const track = tracks[current]
  const pct = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <>
      <div className="pointer-events-none fixed -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <div id={containerId} />
      </div>

      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-[5.75rem] left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 px-2"
      >
        <div className="glass relative overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-blue-500 transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          <AnimatePresence>
            {showList && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-b border-white/10"
              >
                <div className="no-scrollbar max-h-56 overflow-y-auto p-2">
                  {tracks.map((t, i) => {
                    const active = i === current
                    return (
                      <button
                        key={t.id}
                        onClick={() => playIndex(i)}
                        className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                          active ? 'bg-red-500/15' : 'hover:bg-white/5'
                        }`}
                      >
                        <img
                          src={t.thumb || '/placeholder.svg'}
                          alt=""
                          className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              active ? 'text-red-400' : 'text-white'
                            }`}
                          >
                            {t.title}
                          </p>
                          <p className="truncate text-xs text-zinc-500">{t.author}</p>
                        </div>
                        {active && isPlaying && (
                          <span className="flex items-end gap-0.5">
                            {[0, 1, 2].map((b) => (
                              <motion.span
                                key={b}
                                className="w-0.5 rounded-full bg-red-400"
                                animate={{ height: [4, 12, 4] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: b * 0.15,
                                }}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 p-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="relative flex-shrink-0"
              aria-label="Toggle player"
            >
              <img
                src={track?.thumb || '/placeholder.svg'}
                alt=""
                className="h-12 w-12 rounded-xl object-cover shadow-lg"
              />
              <span
                className={`absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 transition-opacity ${
                  isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Music2 className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {track?.title}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {ready ? track?.author : 'Loading\u2026'}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prev}
                className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              </button>
              <button
                onClick={togglePlay}
                disabled={!ready}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_0_18px_rgba(255,45,85,0.5)] transition-transform active:scale-95 disabled:opacity-50"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" fill="currentColor" aria-hidden="true" />
                ) : (
                  <Play className="h-5 w-5 translate-x-px" fill="currentColor" aria-hidden="true" />
                )}
              </button>
              <button
                onClick={next}
                className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-3 px-4 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-9 text-right text-[11px] tabular-nums text-zinc-500">
                      {formatTime(progress)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={progress}
                      onChange={onSeek}
                      className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-red-500"
                      aria-label="Seek"
                    />
                    <span className="w-9 text-[11px] tabular-nums text-zinc-500">
                      {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMute}
                      className="rounded-full p-1.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label={muted ? 'Unmute' : 'Mute'}
                    >
                      {muted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Volume2 className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={muted ? 0 : volume}
                      onChange={onVolume}
                      className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-white/15 accent-blue-500"
                      aria-label="Volume"
                    />
                    <div className="ml-auto flex items-center gap-1">
                      <button
                        onClick={shuffle}
                        className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Shuffle"
                      >
                        <Shuffle className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setShowList((v) => !v)}
                        className={`rounded-full p-2 transition-colors hover:bg-white/10 ${
                          showList ? 'text-red-400' : 'text-zinc-300 hover:text-white'
                        }`}
                        aria-label="Toggle playlist"
                      >
                        <ListMusic className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setExpanded(false)}
                        className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Collapse player"
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
