"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, YoutubeIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { FormatToggle } from "@/components/format-toggle"

export function YoutubeForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      })
      return
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    if (!youtubeRegex.test(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Here you would implement the actual conversion logic
      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success!",
        description: "Your video is ready to download",
      })

      // Here you would redirect to download page or trigger download
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error processing your request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder="Paste YouTube URL here"
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
                Converting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">By using our service, you agree to our Terms of Service.</p>
    </form>
  )
}
