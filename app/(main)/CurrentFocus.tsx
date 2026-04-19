'use client'

import { motion } from 'framer-motion'

import { LightningIcon } from '~/assets'

export type FocusItem = {
  title: string
  detail: string
}

/** 在此更新你当前正在做的事 */
export const CURRENT_FOCUS_ITEMS: ReadonlyArray<FocusItem> = [
  {
    title: '新词开发',
    detail: 'macOS 端功能与交互持续迭代中',
  },
  {
    title: 'ReadLater 项目',
    detail: '上架冲刺中',
  },
]

type CurrentFocusProps = {
  items?: ReadonlyArray<FocusItem>
}

function InProgressDot() {
  return (
    <span
      className="relative flex h-2 w-2 shrink-0"
      aria-hidden
      title="进行中"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-500 opacity-60 dark:bg-lime-400" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-600 dark:bg-lime-300" />
    </span>
  )
}

export function CurrentFocus({ items = CURRENT_FOCUS_ITEMS }: CurrentFocusProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-100 p-6 transition-opacity dark:border-zinc-700/40">
      <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-lime-400/15 to-transparent blur-2xl dark:from-lime-400/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lime-500/[0.04] via-transparent to-zinc-500/[0.02] dark:from-lime-400/[0.06]" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <motion.span
              className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-zinc-900/[0.04] ring-1 ring-zinc-900/10 dark:bg-white/[0.06] dark:ring-white/10"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(132, 204, 22, 0)',
                  '0 0 0 6px rgba(132, 204, 22, 0.12)',
                  '0 0 0 0 rgba(132, 204, 22, 0)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LightningIcon className="h-5 w-5 text-lime-600 dark:text-lime-400" />
            </motion.span>
            <span className="ml-3">我在忙什么</span>
          </h2>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-lime-500/20 bg-lime-500/[0.08] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-lime-800 dark:border-lime-400/25 dark:bg-lime-400/10 dark:text-lime-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-500 opacity-60 dark:bg-lime-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-600 dark:bg-lime-300" />
            </span>
            进行中
          </span>
        </div>

        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 md:text-sm">
          这里会不定期更新我最近在投入的重心。
        </p>

        <motion.ul
          className="mt-5 flex flex-col gap-2.5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07 },
            },
          }}
        >
          {items.map((item) => (
            <motion.li
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white/50 p-3.5 dark:border-zinc-700/40 dark:bg-zinc-900/25"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.detail}
                </p>
              </div>
              <InProgressDot />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}
