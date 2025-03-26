"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { ProductRecommendations } from "@/components/product-recommendations"
import { SafetyAnalysis } from "@/components/safety-analysis"

interface ComparisonResultsProps {
  results: any
  originalProduct: string
  alternativeProduct: string
  productType: string
  onNewComparison: () => void
}

export function ComparisonResults({
  results,
  originalProduct,
  alternativeProduct,
  productType,
  onNewComparison,
}: ComparisonResultsProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Comparison Results</CardTitle>
        <CardDescription>
          Analysis of {originalProduct} vs {alternativeProduct} ({productType})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Match Percentage</h3>
            <span className="text-2xl font-bold text-primary">{results.matchPercentage}%</span>
          </div>
          <Progress value={results.matchPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            This indicates how similar the products are in terms of ingredients and purpose
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{originalProduct}</CardTitle>
              <CardDescription>Original Product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Safety Score</span>
                  <span className="text-sm font-bold">{results.safetyScore.original}/100</span>
                </div>
                <Progress
                  value={results.safetyScore.original}
                  className="h-2"
                  indicatorClassName={
                    results.safetyScore.original > 80
                      ? "bg-green-700"
                      : results.safetyScore.original > 60
                        ? "bg-yellow-700"
                        : "bg-red-900"
                  }
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{alternativeProduct}</CardTitle>
              <CardDescription>Alternative Product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Safety Score</span>
                  <span className="text-sm font-bold">{results.safetyScore.alternative}/100</span>
                </div>
                <Progress
                  value={results.safetyScore.alternative}
                  className="h-2"
                  indicatorClassName={
                    results.safetyScore.alternative > 80
                      ? "bg-green-700"
                      : results.safetyScore.alternative > 60
                        ? "bg-yellow-700"
                        : "bg-red-900"
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="concerns">Concerns</TabsTrigger>
            <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
            <TabsTrigger value="ai-features">AI Features</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Common Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {results.ingredients.common.map((ingredient: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Only in {originalProduct}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {results.ingredients.onlyInOriginal.map((ingredient: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <XCircle className="h-4 w-4 text-red-800 mr-2" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Only in {alternativeProduct}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {results.ingredients.onlyInAlternative.map((ingredient: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="concerns" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{originalProduct} Concerns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {results.concerns.original.map((concern: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <XCircle className="h-4 w-4 text-red-800 mr-2" />
                        {concern}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{alternativeProduct} Concerns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {results.concerns.alternative.map((concern: string, index: number) => (
                      <li key={index} className="text-sm flex items-center">
                        <XCircle className="h-4 w-4 text-red-800 mr-2" />
                        {concern}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="recommendation">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Expert Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{results.recommendation}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai-features" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ProductRecommendations
                productName={originalProduct}
                productType={productType}
                concerns={results.concerns.original}
              />
              <SafetyAnalysis
                productName={originalProduct}
                ingredients={
                  results.ingredients.onlyInOriginal.join(", ") + ", " + results.ingredients.common.join(", ")
                }
                productType={productType}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onNewComparison} className="border-primary/20 hover:bg-primary/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Comparison
        </Button>
        <Button className="bg-gradient-to-r from-primary to-red-900 hover:from-primary/80 hover:to-red-900/80">
          Save Results
        </Button>
      </CardFooter>
    </Card>
  )
}

