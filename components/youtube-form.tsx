"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, YoutubeIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { FormatToggle } from "@/components/format-toggle"

export function YoutubeForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ ჩაწერეთ YouTube-ის URL",
        variant: "destructive",
      })
      return
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    if (!youtubeRegex.test(url)) {
      toast({
        title: "არასწორი URL",
        description: "გთხოვთ ჩაწერეთ სწორი YouTube-ის URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `http://localhost:5284/stream-mp3?url=${encodeURIComponent(url)}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Download failed")
      }

      // Create a blob and trigger download
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = "video.mp3" // Default filename
      document.body.appendChild(a)
      a.click()
      a.remove()

      toast({
        title: "წარმატება!",
        description: "თქვენი ვიდეო მზად არის გადმოსაწერად",
      })
    } catch (error) {
      toast({
        title: "შეცდომა",
        description: "მოთხოვნის დამუშავებისას მოხდა შეცდომა",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleDownload} className="w-full max-w-md space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder="ჩასვით YouTube-ის URL აქ"
            className="pr-10"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          <YoutubeIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <FormatToggle />
          <Button type="submit" disabled={isLoading} className="gap-1">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                კონვერტაცია...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                გადმოწერა
              </>
            )}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        ჩვენი სერვისის გამოყენებით, თქვენ ავტომატურად ეთანხმებით წესებს და პირობებს.
      </p>
    </form>
  )
}
