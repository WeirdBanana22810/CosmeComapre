"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { predictSafetyScore } from "@/app/actions/product-analysis"

interface SafetyAnalysisProps {
  productName: string
  ingredients: string
  productType: string
}

export function SafetyAnalysis({ productName, ingredients, productType }: SafetyAnalysisProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      const result = await predictSafetyScore(productName, ingredients, productType)
      setAnalysis(result)
    } catch (error) {
      console.error("Error analyzing safety:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 90) return "bg-green-700"
    if (score >= 70) return "bg-green-600"
    if (score >= 50) return "bg-yellow-700"
    if (score >= 30) return "bg-orange-700"
    return "bg-red-900"
  }

  const getSafetyLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 70) return "Good"
    if (score >= 50) return "Moderate"
    if (score >= 30) return "Poor"
    return "Very Poor"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Safety Analysis</CardTitle>
        <CardDescription>Detailed ingredient safety assessment for {productName}</CardDescription>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="text-center space-y-2">
              <Info className="h-12 w-12 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-medium">Analyze Product Safety</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Our AI will analyze the ingredients in this product and provide a detailed safety assessment.
              </p>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-4 bg-gradient-to-r from-primary to-red-900 hover:from-primary/80 hover:to-red-900/80"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Ingredients...
                </>
              ) : (
                "Analyze Safety Profile"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Safety Score</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{analysis.safetyScore}</span>
                  <span className="text-sm font-medium text-muted-foreground">/100</span>
                </div>
              </div>
              <Progress
                value={analysis.safetyScore}
                className="h-3"
                indicatorClassName={getSafetyColor(analysis.safetyScore)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div className="flex justify-center mt-1">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10">
                  {getSafetyLabel(analysis.safetyScore)} Safety Profile
                </span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="concerns">Concerns</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="prose prose-sm max-w-none">
                  <p>{analysis.analysis}</p>
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Safe Ingredients
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {analysis.safeIngredients.map((ingredient: string, i: number) => (
                        <div key={i} className="bg-green-50 text-green-800 text-xs rounded-md px-2 py-1">
                          {ingredient}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      Questionable Ingredients
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {analysis.questionableIngredients.map((ingredient: string, i: number) => (
                        <div key={i} className="bg-yellow-50 text-yellow-800 text-xs rounded-md px-2 py-1">
                          {ingredient}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="concerns" className="pt-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Potential Concerns</h4>
                  <ul className="space-y-2">
                    {analysis.concerns.map((concern: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                        <span className="text-sm">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

