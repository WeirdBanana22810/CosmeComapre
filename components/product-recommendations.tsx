"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ThumbsUp, ThumbsDown, ShoppingBag, AlertCircle } from "lucide-react"
import { getProductRecommendations, type ProductRecommendation } from "@/app/actions/product-analysis"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface ProductRecommendationsProps {
  productName: string
  productType: string
  concerns: string[]
}

export function ProductRecommendations({ productName, productType, concerns }: ProductRecommendationsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<ProductRecommendation[] | null>(null)
  const [preferences, setPreferences] = useState("")
  const [budget, setBudget] = useState("mid-range")
  const [additionalConcerns, setAdditionalConcerns] = useState<string[]>([])
  const [showForm, setShowForm] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const concernOptions = [
    { id: "sensitive-skin", label: "Sensitive Skin" },
    { id: "acne-prone", label: "Acne-Prone Skin" },
    { id: "anti-aging", label: "Anti-Aging" },
    { id: "eco-friendly", label: "Eco-Friendly" },
    { id: "fragrance-free", label: "Fragrance-Free" },
    { id: "vegan", label: "Vegan" },
    { id: "cruelty-free", label: "Cruelty-Free" },
  ]

  const handleConcernChange = (id: string, checked: boolean) => {
    if (checked) {
      setAdditionalConcerns([...additionalConcerns, id])
    } else {
      setAdditionalConcerns(additionalConcerns.filter((concern) => concern !== id))
    }
  }

  const handleGetRecommendations = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const allConcerns = [...concerns, ...additionalConcerns]
      const results = await getProductRecommendations(productName, productType, allConcerns, preferences, budget)
      setRecommendations(results)
      setShowForm(false)
    } catch (error) {
      console.error("Error getting recommendations:", error)
      setError("Failed to get recommendations. Please try again.")
      toast({
        title: "Recommendation Error",
        description: "There was an error getting product recommendations.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewRecommendations = () => {
    setRecommendations(null)
    setShowForm(true)
    setError(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Product Recommendations</CardTitle>
        <CardDescription>
          {showForm
            ? "Get personalized product recommendations based on your preferences"
            : `Alternative options for ${productName}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-center text-destructive">{error}</p>
            <Button onClick={() => setError(null)}>Try Again</Button>
          </div>
        ) : showForm ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What are your main concerns?</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {concernOptions.map((concern) => (
                  <div key={concern.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={concern.id}
                      checked={additionalConcerns.includes(concern.id)}
                      onCheckedChange={(checked) => handleConcernChange(concern.id, checked as boolean)}
                    />
                    <Label htmlFor={concern.id}>{concern.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferences">Additional Preferences</Label>
              <Textarea
                id="preferences"
                placeholder="E.g., I prefer products with natural ingredients, no silicones, etc."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget-Friendly</SelectItem>
                  <SelectItem value="mid-range">Mid-Range</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : recommendations ? (
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{recommendation.name}</h3>
                      <p className="text-sm text-muted-foreground">{recommendation.brand}</p>
                    </div>
                    <div className="bg-primary text-primary-foreground text-sm font-medium rounded-full px-3 py-1">
                      {recommendation.safetyScore}/100
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="mb-3">{recommendation.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {recommendation.keyIngredients.map((ingredient, i) => (
                          <span
                            key={i}
                            className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-1"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-1">Benefits:</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {recommendation.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-medium">{recommendation.price}</span>
                      <span className="text-sm text-muted-foreground">{recommendation.whereToFind}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not for me
                    </Button>
                  </div>
                  <Button size="sm">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Find Product
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        {showForm ? (
          <Button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-red-900 hover:from-primary/80 hover:to-red-900/80"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Recommendations...
              </>
            ) : (
              "Get Recommendations"
            )}
          </Button>
        ) : (
          <Button onClick={handleNewRecommendations} variant="outline" className="w-full">
            Adjust Preferences
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

