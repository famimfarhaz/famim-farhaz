"use client"

import ClickSpark from "@/components/ui/click-spark"

export default function ClickSparkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      {children}
    </ClickSpark>
  )
}
