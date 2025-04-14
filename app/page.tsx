import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { YoutubeIcon, Download, Clock, LucideLink, Music } from "lucide-react"
import Link from "next/link"
import { FormatToggle } from "@/components/format-toggle"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <YoutubeIcon className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">Muzzon.ge</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2 max-w-[800px]">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Download YouTube Videos in Seconds
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Convert and download your favorite YouTube videos quickly and easily. No registration required.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Input type="url" placeholder="Paste YouTube URL here" className="pr-10" />
                    <YoutubeIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <FormatToggle />
                    <Button className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  By using our service, you agree to our Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Converting YouTube videos has never been easier. Just follow these simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <LucideLink className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Paste YouTube Link</h3>
                <p className="text-center text-muted-foreground">
                  Copy the URL of the YouTube video you want to download and paste it into the input field.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Choose Format</h3>
                <p className="text-center text-muted-foreground">
                  Select your preferred format (MP3 for audio only or MP4 for video) by clicking the format toggle
                  button.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Click Download</h3>
                <p className="text-center text-muted-foreground">
                  Click the download button and wait for the conversion process to complete. This might take a few
                  moments.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl rounded-lg border bg-muted p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold">Important Information</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    <span className="font-medium">Maximum Length:</span> Videos must be 15 minutes or shorter to be
                    converted.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    <span className="font-medium">Processing Time:</span> Conversion may take some time depending on the
                    video length and quality.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <Music className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    <span className="font-medium">Format Options:</span> Choose MP3 for audio only or MP4 for video with
                    audio.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <YoutubeIcon className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    <span className="font-medium">Supported Links:</span> Only YouTube video links are supported at this
                    time.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <YoutubeIcon className="h-5 w-5 text-red-600" />
            <span className="text-lg font-semibold">Muzzon.ge</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Muzzon.ge. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
