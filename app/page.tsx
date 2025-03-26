import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-black">
        <Link className="flex items-center justify-center" href="#">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">CosmeCompare</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-primary hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-900">
                    Compare Cosmetic Products with AI-Powered Analysis
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Find safer alternatives, understand ingredients, and make informed decisions about your skincare
                    products.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/compare">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-red-900 hover:from-primary/80 hover:to-red-900/80"
                    >
                      Start Comparing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black to-background opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      <div className="animate-float-slow bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary/20">
                        <div className="h-4 w-24 bg-primary/20 rounded mb-2"></div>
                        <div className="h-3 w-full bg-muted rounded mb-1"></div>
                        <div className="h-3 w-3/4 bg-muted rounded mb-1"></div>
                        <div className="h-3 w-5/6 bg-muted rounded"></div>
                        <div className="mt-3 h-6 w-16 bg-primary/30 rounded-full"></div>
                      </div>
                      <div className="animate-float bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-red-900/20">
                        <div className="h-4 w-20 bg-red-900/30 rounded mb-2"></div>
                        <div className="h-3 w-full bg-muted rounded mb-1"></div>
                        <div className="h-3 w-2/3 bg-muted rounded mb-1"></div>
                        <div className="h-3 w-5/6 bg-muted rounded"></div>
                        <div className="mt-3 h-6 w-16 bg-red-700/30 rounded-full"></div>
                      </div>
                      <div className="animate-float-slow col-span-2 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary/20">
                        <div className="flex justify-between items-center mb-2">
                          <div className="h-4 w-32 bg-gradient-to-r from-primary/40 to-red-700/40 rounded"></div>
                          <div className="h-6 w-6 rounded-full bg-primary/40"></div>
                        </div>
                        <div className="h-3 w-full bg-muted rounded mb-1"></div>
                        <div className="h-3 w-5/6 bg-muted rounded mb-3"></div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 bg-green-900/30 rounded"></div>
                          <div className="h-8 bg-yellow-900/30 rounded"></div>
                          <div className="h-8 bg-red-900/30 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered analysis helps you make informed decisions about your skincare products
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 bg-card rounded-xl p-6 shadow-sm border border-primary/20 animate-float-slow">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <div className="text-xl font-bold text-primary">1</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Select Product Type</h3>
                  <p className="text-muted-foreground">
                    Choose from facewash, sunscreen, or moisturizer to begin your comparison
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-card rounded-xl p-6 shadow-sm border border-red-700/20 animate-float">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-900/10">
                  <div className="text-xl font-bold text-red-800">2</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Enter Products</h3>
                  <p className="text-muted-foreground">
                    Input your current product and potential alternatives you're considering
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-card rounded-xl p-6 shadow-sm border border-primary/20 animate-float-slow">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <div className="text-xl font-bold text-primary">3</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Get Detailed Analysis</h3>
                  <p className="text-muted-foreground">
                    Receive match percentages, safety scores, and ingredient comparisons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40 bg-black">
        <p className="text-xs text-muted-foreground">© 2025 CosmeCompare. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-primary hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-primary hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

