export interface ComparisonResult {
  matchPercentage: number
  safetyScore: {
    original: number
    alternative: number
  }
  ingredients: {
    common: string[]
    onlyInOriginal: string[]
    onlyInAlternative: string[]
  }
  concerns: {
    original: string[]
    alternative: string[]
  }
  recommendation: string
}

export interface ProductRecommendation {
  name: string
  brand: string
  description: string
  safetyScore: number
  keyIngredients: string[]
  benefits: string[]
  price: string
  whereToFind: string
  suitableFor: string[]
}

