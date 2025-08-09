'use client'

import { useState } from 'react'
import LandingPage from '@/components/LandingPage'
import AIContentAnalyzer from '@/components/AIContentAnalyzer'

export default function Home() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <AIContentAnalyzer />
  }

  return <LandingPage onGetStarted={() => setShowApp(true)} />
}
