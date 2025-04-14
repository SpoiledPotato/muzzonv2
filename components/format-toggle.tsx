"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Music, Video } from "lucide-react"

export function FormatToggle() {
  const [format, setFormat] = useState<"MP3" | "MP4">("MP4")

  const toggleFormat = () => {
    setFormat(format === "MP3" ? "MP4" : "MP3")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFormat}
      title={`Currently set to ${format}. Click to switch to ${format === "MP3" ? "MP4" : "MP3"}`}
      className="w-auto px-3 gap-1.5"
    >
      {format === "MP3" ? <Music className="h-4 w-4" /> : <Video className="h-4 w-4" />}
      {format}
    </Button>
  )
}
