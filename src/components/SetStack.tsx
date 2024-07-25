import React, {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from 'react'

interface SetStackProps {
  children: ReactNode
  reverse?: boolean
}

const SetStack: React.FC<SetStackProps> = ({ children, reverse = false }) => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [colorPointer, setColorPointer] = useState('')

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  const updateColorPointer = () => {
    const themePreference = localStorage.getItem('theme') || 'system'

    if (themePreference === 'dark') {
      setColorPointer('rgba(250, 204, 21, 0.1)')
    } else {
      setColorPointer('rgba(76, 29, 149, 0.1)')
    }
  }

  useEffect(() => {
    const div = divRef.current
    if (!div) return

    div.addEventListener('mousemove', handleMouseMove as any)
    div.addEventListener('focus', handleFocus)
    div.addEventListener('blur', handleBlur)
    div.addEventListener('mouseenter', handleMouseEnter)
    div.addEventListener('mouseleave', handleMouseLeave)

    updateColorPointer()

    const handleThemeChange = () => {
      updateColorPointer()
    }

    document.addEventListener('themeChange', handleThemeChange)

    return () => {
      div.removeEventListener('mousemove', handleMouseMove as any)
      div.removeEventListener('focus', handleFocus)
      div.removeEventListener('blur', handleBlur)
      div.removeEventListener('mouseenter', handleMouseEnter)
      div.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('themeChange', handleThemeChange)
    }
  }, [isFocused])

  return (
    <article
      ref={divRef}
      className={`relative rounded-2xl p-6 dark:border dark:border-dark-900 ${
        reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
      } dark:from-dark-950 dark:to-black shadow-2xl overflow-hidden ${
        reverse && 'lg:flex-row-reverse'
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity: opacity.toString(),
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${colorPointer}, transparent 40%)`,
        }}
      />
      {children}
    </article>
  )
}

export default SetStack
