"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { ComparisonResults } from "@/components/comparison-results"
import { DatasetProducts } from "@/components/dataset-products"
import { analyzeProducts } from "@/app/actions/product-analysis"
import { toast } from "@/hooks/use-toast"

export default function ComparePage() {
  const [step, setStep] = useState(1)
  const [productType, setProductType] = useState("facewash")
  const [originalProduct, setOriginalProduct] = useState("")
  const [alternativeProduct, setAlternativeProduct] = useState("")
  const [originalIngredients, setOriginalIngredients] = useState("")
  const [alternativeIngredients, setAlternativeIngredients] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState("dataset") // Default to dataset tab

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleCompare()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCompare = async () => {
    setIsAnalyzing(true)
    try {
      // Call the server action to analyze the products
      const analysisResults = await analyzeProducts(
        originalProduct,
        originalIngredients,
        alternativeProduct,
        alternativeIngredients,
        productType,
      )

      setResults(analysisResults)
    } catch (error) {
      console.error("Error analyzing products:", error)
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing the products. Using sample data instead.",
        variant: "destructive",
      })

      // If there's an error, fall back to the simulated data
      setResults({
        matchPercentage: 78,
        safetyScore: {
          original: 65,
          alternative: 92,
        },
        ingredients: {
          common: ["Water", "Glycerin", "Sodium Hyaluronate"],
          onlyInOriginal: ["Methylparaben", "Fragrance", "Sodium Lauryl Sulfate"],
          onlyInAlternative: ["Aloe Vera Extract", "Chamomile Extract", "Jojoba Oil"],
        },
        concerns: {
          original: ["Contains potential irritants", "Has parabens", "Contains sulfates"],
          alternative: ["May not be suitable for very oily skin"],
        },
        recommendation:
          "The alternative product appears to be safer with fewer potentially harmful ingredients. It contains more natural extracts and lacks the common irritants found in the original product.",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSelectOriginalProduct = (productName: string, ingredients: string) => {
    setOriginalProduct(productName)
    setOriginalIngredients(ingredients)
    setActiveTab("manual")
  }

  const handleSelectAlternativeProduct = (productName: string, ingredients: string) => {
    setAlternativeProduct(productName)
    setAlternativeIngredients(ingredients)
    setActiveTab("manual")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-black">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40 bg-black">
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">CosmeCompare</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-primary hover:underline underline-offset-4" href="#">
            My Comparisons
          </Link>
          <Button variant="ghost" size="sm" className="hover:text-primary hover:bg-primary/10">
            Sign Out
          </Button>
        </nav>
      </header>
      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4 md:px-6">
          {!results ? (
            <Card className="border border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Compare Cosmetic Products</CardTitle>
                <CardDescription>
                  Follow the steps to compare ingredients and safety profiles of cosmetic products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                        1
                      </div>
                      <span className="ml-2 hidden sm:inline">Select Product Type</span>
                    </div>
                    <div className="h-px w-12 bg-muted"></div>
                    <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                        2
                      </div>
                      <span className="ml-2 hidden sm:inline">Original Product</span>
                    </div>
                    <div className="h-px w-12 bg-muted"></div>
                    <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                        3
                      </div>
                      <span className="ml-2 hidden sm:inline">Alternative Product</span>
                    </div>
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Select Product Type</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose the type of cosmetic product you want to compare
                      </p>
                    </div>
                    <RadioGroup
                      value={productType}
                      onValueChange={setProductType}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <Label
                        htmlFor="facewash"
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                          productType === "facewash" ? "border-primary" : "border-muted"
                        }`}
                      >
                        <RadioGroupItem value="facewash" id="facewash" className="sr-only" />
                        <div className="mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M7 16a4 4 0 0 1-.88-7.89L6 8" />
                            <path d="M15 13a4 4 0 0 0 0-8" />
                            <path d="M5 14a2 2 0 0 0 2 2h12a2 2 0 0 0 0-4H9" />
                          </svg>
                        </div>
                        <span className="block text-center font-medium">Face Wash</span>
                      </Label>
                      <Label
                        htmlFor="moisturizer"
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                          productType === "moisturizer" ? "border-primary" : "border-muted"
                        }`}
                      >
                        <RadioGroupItem value="moisturizer" id="moisturizer" className="sr-only" />
                        <div className="mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 0 1-2 2Z" />
                            <path d="M6 12v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
                            <path d="M16 12h0" />
                            <path d="M6 13c-1.1 0-2 .9-2 2v2h8v-2a2 2 0 0 0-2-2H6Z" />
                          </svg>
                        </div>
                        <span className="block text-center font-medium">Moisturizer</span>
                      </Label>
                      <Label
                        htmlFor="serum"
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent cursor-pointer ${
                          productType === "serum" ? "border-primary" : "border-muted"
                        }`}
                      >
                        <RadioGroupItem value="serum" id="serum" className="sr-only" />
                        <div className="mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M14 12c0 4.418-1.79 8-4 8s-4-3.582-4-8 1.79-8 4-8 4 3.582 4 8Z" />
                            <path d="M14 12h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6" />
                          </svg>
                        </div>
                        <span className="block text-center font-medium">Serum</span>
                      </Label>
                    </RadioGroup>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Enter Your Current Product</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide the name of the product you're currently using
                      </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="dataset">Browse Dataset</TabsTrigger>
                        <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                      </TabsList>

                      <TabsContent value="manual" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="original-product">Product Name</Label>
                          <Input
                            id="original-product"
                            placeholder={`Enter your current ${productType} name`}
                            value={originalProduct}
                            onChange={(e) => setOriginalProduct(e.target.value)}
                            className="bg-secondary/50 border-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="original-ingredients">Ingredients</Label>
                          <textarea
                            id="original-ingredients"
                            className="flex min-h-[120px] w-full rounded-md border border-primary/20 bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Paste the ingredients list here if available"
                            value={originalIngredients}
                            onChange={(e) => setOriginalIngredients(e.target.value)}
                          ></textarea>
                          <p className="text-xs text-muted-foreground">
                            You can usually find this on the product packaging or manufacturer's website
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="dataset" className="pt-4">
                        <DatasetProducts onSelectProduct={handleSelectOriginalProduct} productType={productType} />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Enter Alternative Product</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide the name of the product you're considering as an alternative
                      </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="dataset">Browse Dataset</TabsTrigger>
                        <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                      </TabsList>

                      <TabsContent value="manual" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="alternative-product">Product Name</Label>
                          <Input
                            id="alternative-product"
                            placeholder={`Enter alternative ${productType} name`}
                            value={alternativeProduct}
                            onChange={(e) => setAlternativeProduct(e.target.value)}
                            className="bg-secondary/50 border-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alternative-ingredients">Ingredients</Label>
                          <textarea
                            id="alternative-ingredients"
                            className="flex min-h-[120px] w-full rounded-md border border-primary/20 bg-secondary/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Paste the ingredients list here if available"
                            value={alternativeIngredients}
                            onChange={(e) => setAlternativeIngredients(e.target.value)}
                          ></textarea>
                          <p className="text-xs text-muted-foreground">
                            You can usually find this on the product packaging or manufacturer's website
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="dataset" className="pt-4">
                        <DatasetProducts onSelectProduct={handleSelectAlternativeProduct} productType={productType} />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={(step === 2 && !originalProduct) || (step === 3 && !alternativeProduct) || isAnalyzing}
                  className="bg-gradient-to-r from-primary to-red-900 hover:from-primary/80 hover:to-red-900/80"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : step === 3 ? (
                    <>Compare Products</>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <ComparisonResults
              results={results}
              originalProduct={originalProduct}
              alternativeProduct={alternativeProduct}
              productType={productType}
              onNewComparison={() => {
                setResults(null)
                setStep(1)
                setOriginalProduct("")
                setAlternativeProduct("")
                setOriginalIngredients("")
                setAlternativeIngredients("")
              }}
            />
          )}
        </div>
      </main>
    </div>
  )
}

