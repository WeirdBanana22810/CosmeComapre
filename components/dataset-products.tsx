"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { getProductSuggestions } from "@/app/actions/product-analysis"

interface DatasetProductsProps {
  onSelectProduct: (productName: string, ingredients: string) => void
  productType: string
}

export function DatasetProducts({ onSelectProduct, productType }: DatasetProductsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [skinType, setSkinType] = useState<"combination" | "dry" | "normal" | "oily" | "sensitive">("normal")

  useEffect(() => {
    loadProducts()
  }, [skinType, productType])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const results = await getProductSuggestions(skinType, productType)
      setProducts(results)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Products from Dataset</CardTitle>
        <CardDescription>Browse products from our Kaggle dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skin-type">Skin Type</Label>
            <Select value={skinType} onValueChange={(value: any) => setSkinType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select skin type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal Skin</SelectItem>
                <SelectItem value="dry">Dry Skin</SelectItem>
                <SelectItem value="oily">Oily Skin</SelectItem>
                <SelectItem value="combination">Combination Skin</SelectItem>
                <SelectItem value="sensitive">Sensitive Skin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <CardDescription>{product.brand}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-2">Price: {product.price}</p>
                    <div className="text-xs text-muted-foreground max-h-20 overflow-hidden">
                      <strong>Ingredients:</strong> {product.ingredients.substring(0, 150)}...
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => onSelectProduct(product.name, product.ingredients)}
                    >
                      Select This Product
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No products found for this skin type and product category.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

