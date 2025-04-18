"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  YoutubeIcon,
  Download,
  Clock,
  LucideLink,
  Music,
  Sun,
  Moon,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import axios from "axios";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const url = inputRef.current?.value;

    if (!url) {
      setMessage({ type: "error", text: "გთხოვთ ჩასვათ ბმული." });
      setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setMessage(null);

    const id = crypto.randomUUID();
    const downloadUrl = `http://localhost:5284/stream-mp3?url=${encodeURIComponent(url)}&id=${id}`;

    axios({
      url: downloadUrl,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: "audio/mpeg" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "title.mp3";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        setMessage({ type: "success", text: "ფაილი წარმატებით გადმოწერილია!" });
        setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        setMessage({ type: "error", text: "ფაილის გადმოწერისას მოხდა შეცდომა." });
        setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
        setIsLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <YoutubeIcon className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">Muzzon</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                მთავარი
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                როგორ მუშაობს?
              </Link>
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="ml-2">
                {theme === "light" ? "ღამის რეჟიმი" : "დღის რეჟიმი"}
              </span>
            </Button>
            <Button variant="outline" size="sm" className="md:hidden">
              მენიუ
            </Button>
          </div>
        </header>

        <main className="flex-1">
          <section
            className={`w-full py-6 md:py-12 lg:py-16 xl:py-24 ${
              theme === "light"
                ? "bg-gradient-to-b from-white via-gray-200 to-gray-400"
                : "bg-gradient-to-b from-background via-muted to-muted/80"
            } relative`}
          >
            <div className="container px-4 md:px-6">
              <div className="relative flex flex-col items-center justify-center space-y-6 text-center">
                <div className="w-full max-w-md space-y-4">
                  <h1 className="text-xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">
                    დააკონვერტირე და გადმოწერე YouTube-ის ვიდეოები
                  </h1>
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      type="url"
                      placeholder="ჩასვით YouTube-ის URL აქ"
                      className="pr-10 border-2 border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <YoutubeIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col gap-4 items-center">
                    <Button
                      className="gap-1"
                      disabled={isLoading}
                      onClick={handleDownload}
                    >
                      {isLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {isLoading ? "გადმოწერა მიმდინარეობს..." : "გადმოწერა"}
                    </Button>
                    {/* Reserve space for the message */}
                    <div className="h-6">
                      {message && (
                        <p
                          className={`text-sm ${
                            message.type === "success" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {message.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
                <p className="text-xs text-muted-foreground">
                  ჩვენი სერვისის გამოყენებით, თქვენ ავტომატურად ეთანხმებით
                  წესებს და პირობებს.
                </p>
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="w-full py-6 md:py-12 lg:py-16 bg-background"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    როგორ მუშაობს?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    YouTube-ის ვიდეოების კონვერტაცია არასდროს ყოფილა ასეთი
                    მარტივი. მიჰყევით ამ მარტივ ნაბიჯებს.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3">
                    <LucideLink className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">ჩასვით YouTube-ის ბმული</h3>
                  <p className="text-center text-muted-foreground">
                    დააკოპირეთ YouTube-ის ვიდეოს URL და ჩასვით ის შესაბამის
                    ველში.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">აირჩიეთ ფორმატი</h3>
                  <p className="text-center text-muted-foreground">
                    აირჩიეთ სასურველი ფორმატი (MP3 მხოლოდ აუდიოსთვის ან MP4
                    ვიდეოსთვის) ფორმატის გადამრთველის გამოყენებით. (მალე
                    დაემატება)
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">დააჭირეთ გადმოწერას</h3>
                  <p className="text-center text-muted-foreground">
                    დააჭირეთ გადმოწერის ღილაკს და დაელოდეთ კონვერტაციის პროცესის
                    დასრულებას. ეს შეიძლება რამდენიმე წამი გაგრძელდეს.
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-3xl rounded-lg border bg-muted p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">
                  მნიშვნელოვანი ინფორმაცია
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      <span className="font-medium">
                        მაქსიმალური ხანგრძლივობა:
                      </span>{" "}
                      ვიდეოები უნდა იყოს 15 წუთზე ნაკლები, რომ მოხდეს
                      კონვერტაცია.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      <span className="font-medium">დამუშავების დრო:</span>{" "}
                      კონვერტაციას შეიძლება გარკვეული დრო დასჭირდეს ვიდეოს
                      ხანგრძლივობისა და ხარისხის მიხედვით.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Music className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      <span className="font-medium">ფორმატის არჩევანი:</span>{" "}
                      აირჩიეთ MP3 მხოლოდ აუდიოსთვის ან MP4 ვიდეოსთვის.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <YoutubeIcon className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      <span className="font-medium">მხარდაჭერილი ბმულები:</span>{" "}
                      ამ ეტაპზე მხოლოდ YouTube-ის ვიდეო ბმულებია მხარდაჭერილი.
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
              <span className="text-lg font-semibold">Muzzon</span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Muzzon. ყველა უფლება დაცულია.
            </p>
            <nav className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline underline-offset-4"
              >
                წესები და პირობები
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline underline-offset-4"
              >
                კონტაქტი
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
