import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type Variant = 'hero' | 'banner'
type Glow = 'right' | 'left' | 'center' | 'none'

type Props = {
  children: ReactNode
  className?: string
  variant?: Variant
  glow?: Glow
  showWave?: boolean
}

const glowPosition: Record<Exclude<Glow, 'none'>, string> = {
  right: 'right-[-10%] top-1/2 -translate-y-1/2',
  left: 'left-[-10%] top-1/2 -translate-y-1/2',
  center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
}

const gridStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)',
  maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 80%)',
}

const ECG_PATH =
  'M0,32 L80,32 L100,32 L115,12 L130,52 L145,8 L160,56 L175,32 L240,32 L260,32 L275,18 L290,46 L305,32 L400,32 L480,32 L495,20 L510,44 L525,32 L640,32 L720,32 L735,14 L750,50 L765,32 L900,32 L1000,32'

/**
 * Reusable navy “dark grid” surface — hero (full) or banner (lighter, no ECG by default).
 */
export function GridBackground({
  children,
  className,
  variant = 'hero',
  glow = 'right',
  showWave,
}: Props) {
  const waveVisible = showWave ?? variant === 'hero'
  const isBanner = variant === 'banner'

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        isBanner ? 'min-h-0' : 'min-h-[inherit]',
        className,
      )}
      style={{
        backgroundImage: 'linear-gradient(180deg, #06204a 0%, #041633 45%, #021027 100%)',
        backgroundColor: '#041633',
      }}
    >
      {/* Grid pattern — fades at edges */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          isBanner ? 'opacity-40 sm:opacity-50' : 'opacity-50 sm:opacity-70 md:opacity-100',
        )}
        style={gridStyle}
        aria-hidden="true"
      />

      {/* Brand blue glow */}
      {glow !== 'none' ? (
        <div
          className={cn(
            'pointer-events-none absolute rounded-full bg-[#2f7fb0]/20 blur-[120px]',
            isBanner
              ? 'size-[280px] sm:size-[360px]'
              : 'size-[320px] sm:size-[420px] md:size-[500px]',
            glowPosition[glow],
          )}
          aria-hidden="true"
        />
      ) : null}

      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(2,16,39,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ECG pulse strip */}
      {waveVisible ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-white/5"
          aria-hidden="true"
        >
          <svg
            className="h-full w-full drop-shadow-[0_0_6px_rgba(59,130,246,0.55)]"
            viewBox="0 0 1000 64"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              id="grid-bg-ecg-path"
              d={ECG_PATH}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle r="4" fill="#fbbf24" className="motion-safe:opacity-100 motion-reduce:opacity-0">
              <animateMotion dur="6s" repeatCount="indefinite" path={ECG_PATH} />
            </circle>
          </svg>
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
