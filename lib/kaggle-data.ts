import type { ComparisonResult } from "@/types/comparison"

// Types for our cosmetic products data
export interface CosmeticProduct {
  id: string
  brand: string
  name: string
  price: string
  rank: number
  ingredients: string
  combination: boolean
  dry: boolean
  normal: boolean
  oily: boolean
  sensitive: boolean
  product_type: string
}

// In-memory cache for our dataset
let productsCache: CosmeticProduct[] | null = null

/**
 * Load cosmetic products from the pre-processed dataset
 */
export async function loadCosmeticProducts(): Promise<CosmeticProduct[]> {
  // Return cached data if available
  if (productsCache) {
    return productsCache
  }

  // Sample data based on the Kaggle dataset structure
  const products = [
    {
      id: "1",
      brand: "CeraVe",
      name: "Hydrating Facial Cleanser",
      price: "$15.99",
      rank: 4.5,
      ingredients:
        "Aqua/Water, Glycerin, Cetearyl Alcohol, Phenoxyethanol, Stearyl Alcohol, Cetyl Alcohol, Peg-40 Stearate, Behentrimonium Methosulfate, Glyceryl Stearate, Polysorbate 20, Ethlhexylglycerin, Potassium Phosphate, Disodium Edta, Dipotassium Phosphate, Sodium Lauroyl Lactylate, Ceramide Np, Ceramide Ap, Phytosphingosine, Cholesterol, Sodium Hyaluronate, Xanthan Gum, Carbomer, Tocopherol, Ceramide Eop",
      combination: true,
      dry: true,
      normal: true,
      oily: false,
      sensitive: true,
      product_type: "facewash",
    },
    {
      id: "2",
      brand: "The Ordinary",
      name: "Niacinamide 10% + Zinc 1%",
      price: "$5.90",
      rank: 4.2,
      ingredients:
        "Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin",
      combination: true,
      dry: false,
      normal: true,
      oily: true,
      sensitive: false,
      product_type: "serum",
    },
    {
      id: "3",
      brand: "Neutrogena",
      name: "Hydro Boost Water Gel",
      price: "$19.99",
      rank: 4.3,
      ingredients:
        "Water, Dimethicone, Glycerin, Dimethicone/Vinyl Dimethicone Crosspolymer, Phenoxyethanol, Polyacrylamide, Cetearyl Olivate, Sorbitan Olivate, Dimethiconol, C13-14 Isoparaffin, Dimethicone Crosspolymer, Chlorphenesin, Carbomer, Laureth-7, Sodium Hyaluronate, Ethylhexylglycerin, C12-14 Pareth-12, Sodium Hydroxide, Blue 1",
      combination: true,
      dry: true,
      normal: true,
      oily: true,
      sensitive: true,
      product_type: "moisturizer",
    },
    {
      id: "4",
      brand: "Paula's Choice",
      name: "2% BHA Liquid Exfoliant",
      price: "$29.50",
      rank: 4.6,
      ingredients:
        "Water, Methylpropanediol, Butylene Glycol, Salicylic Acid, Polysorbate 20, Camellia Oleifera Leaf Extract, Sodium Hydroxide, Tetrasodium EDTA",
      combination: true,
      dry: false,
      normal: true,
      oily: true,
      sensitive: false,
      product_type: "exfoliator",
    },
    {
      id: "5",
      brand: "La Roche-Posay",
      name: "Anthelios Melt-In Milk Sunscreen SPF 60",
      price: "$35.99",
      rank: 4.4,
      ingredients:
        "Water, Homosalate, Ethylhexyl Salicylate, Avobenzone, Octocrylene, Glycerin, Silica, Triethanolamine, Acrylates Copolymer, Tocopherol, Phenoxyethanol, Stearic Acid, Chlorphenesin, Fragrance, Palmitic Acid, Peg-100 Stearate, Glyceryl Stearate, Dimethicone, Xanthan Gum, Disodium Edta, Caprylic/Capric Triglyceride, Caprylyl Glycol, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Cassia Alata Leaf Extract",
      combination: true,
      dry: true,
      normal: true,
      oily: true,
      sensitive: true,
      product_type: "sunscreen",
    },
    {
      id: "6",
      brand: "Cetaphil",
      name: "Gentle Skin Cleanser",
      price: "$13.99",
      rank: 4.3,
      ingredients:
        "Water, Cetyl Alcohol, Propylene Glycol, Sodium Lauryl Sulfate, Stearyl Alcohol, Methylparaben, Propylparaben, Butylparaben",
      combination: true,
      dry: true,
      normal: true,
      oily: true,
      sensitive: true,
      product_type: "facewash",
    },
    {
      id: "7",
      brand: "The Ordinary",
      name: "Hyaluronic Acid 2% + B5",
      price: "$6.80",
      rank: 4.1,
      ingredients:
        "Aqua (Water), Sodium Hyaluronate, Pentylene Glycol, Propanediol, Sodium Hyaluronate Crosspolymer, Panthenol, Ahnfeltia Concinna Extract, Glycerin, Trisodium Ethylenediamine Disuccinate, Citric Acid, Isoceteth-20, Ethoxydiglycol, Ethylhexylglycerin, Hexylene Glycol, 1,2-Hexanediol, Phenoxyethanol, Caprylyl Glycol",
      combination: true,
      dry: true,
      normal: true,
      oily: true,
      sensitive: true,
      product_type: "serum",
    },
    {
      id: "8",
      brand: "CeraVe",
      name: "Moisturizing Cream",
      price: "$16.99",
      rank: 4.7,
      ingredients:
        "Aqua/Water, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Cetyl Alcohol, Ceteareth-20, Petrolatum, Potassium Phosphate, Ceramide Np, Ceramide Ap, Ceramide Eop, Carbomer, Dimethicone, Behentrimonium Methosulfate, Sodium Lauroyl Lactylate, Sodium Hyaluronate, Cholesterol, Phenoxyethanol, Disodium Edta, Dipotassium Phosphate, Tocopherol, Phytosphingosine, Xanthan Gum, Ethylhexylglycerin",
      combination: true,
      dry: true,
      normal: true,
      oily: false,
      sensitive: true,
      product_type: "moisturizer",
    },
    {
      id: "9",
      brand: "Drunk Elephant",
      name: "T.L.C. Framboos Glycolic Night Serum",
      price: "$90.00",
      rank: 4.5,
      ingredients:
        "Water, Glycolic Acid, Butylene Glycol, Glycerin, Sodium Hydroxide, Salicylic Acid, Lactic Acid, Citric Acid, Vitis Vinifera (Grape) Juice Extract, Aloe Barbadensis Leaf Juice, Opuntia Ficus-Indica Extract, Aesculus Hippocastanum (Horse Chestnut) Seed Extract, Camellia Sinensis Leaf Extract, Rubus Idaeus (Raspberry) Fruit Extract, Saccharomyces Cerevisiae Extract, Buddleja Davidii Meristem Cell Culture, Sclerocarya Birrea Seed Oil, Sodium Hyaluronate Crosspolymer, Allantoin, Hydroxyethylcellulose, Galactoarabinan, Propanediol, Disodium EDTA, Xanthan Gum, Hexylene Glycol, Phenoxyethanol, Sodium Nitrate, Potassium Sorbate, Sodium Benzoate, Caprylyl Glycol, Sodium Sulfite, Sodium Chloride",
      combination: true,
      dry: false,
      normal: true,
      oily: true,
      sensitive: false,
      product_type: "serum",
    },
    {
      id: "10",
      brand: "Supergoop!",
      name: "Unseen Sunscreen SPF 40",
      price: "$34.00",
      rank: 4.6,
      ingredients:
        "Avobenzone 3%, Homosalate 8%, Octisalate 5%, Octocrylene 4%, Dimethicone, Dimethicone/Vinyl Dimethicone Crosspolymer, Phenoxyethanol, Caprylyl Methicone, Glycerin, Tocopheryl Acetate, Diethylhexyl Syringylidenemalonate, Caprylic/Capric Triglyceride, Bisabolol, Silica, Acrylates/Polytrimethylsiloxymethacrylate Copolymer, Trideceth-6, Isododecane, PEG-12 Dimethicone, Isohexadecane, Butyloctyl Salicylate, Polymethylsilsesquioxane, Cucumis Sativus (Cucumber) Fruit Extract, Capryloyl Glycerin/Sebacic Acid Copolymer, Acrylates/Dimethicone Copolymer, Fragrance",
      combination: true,
      dry: true,
      normal: true,
      oily: true,
      sensitive: false,
      product_type: "sunscreen",
    },
  ]

  // Add more products to simulate a larger dataset
  for (let i = 11; i <= 50; i++) {
    const skinTypes = ["combination", "dry", "normal", "oily", "sensitive"]
    const productTypes = ["facewash", "moisturizer", "serum", "sunscreen", "exfoliator", "toner", "mask"]
    const brands = [
      "The Ordinary",
      "CeraVe",
      "Neutrogena",
      "La Roche-Posay",
      "Paula's Choice",
      "Drunk Elephant",
      "Cetaphil",
      "Supergoop!",
      "Kiehl's",
      "First Aid Beauty",
    ]

    const randomBrand = brands[Math.floor(Math.random() * brands.length)]
    const randomProductType = productTypes[Math.floor(Math.random() * productTypes.length)]
    const randomPrice = `$${(Math.random() * 50 + 5).toFixed(2)}`
    const randomRank = (Math.random() * 2 + 3).toFixed(1)

    products.push({
      id: i.toString(),
      brand: randomBrand,
      name: `${randomBrand} ${randomProductType.charAt(0).toUpperCase() + randomProductType.slice(1)} ${i}`,
      price: randomPrice,
      rank: Number.parseFloat(randomRank),
      ingredients:
        "Water, Glycerin, Cetearyl Alcohol, Phenoxyethanol, Stearyl Alcohol, Cetyl Alcohol, Peg-40 Stearate, Behentrimonium Methosulfate, Glyceryl Stearate, Polysorbate 20, Ethlhexylglycerin, Potassium Phosphate, Disodium Edta, Dipotassium Phosphate, Sodium Lauroyl Lactylate, Ceramide Np, Ceramide Ap, Phytosphingosine, Cholesterol, Sodium Hyaluronate, Xanthan Gum, Carbomer, Tocopherol, Ceramide Eop",
      combination: Math.random() > 0.5,
      dry: Math.random() > 0.5,
      normal: Math.random() > 0.5,
      oily: Math.random() > 0.5,
      sensitive: Math.random() > 0.5,
      product_type: randomProductType,
    })
  }

  // Cache the data
  productsCache = products
  return products
}

/**
 * Search for products by name or type
 */
export async function searchProducts(query: string, type?: string): Promise<CosmeticProduct[]> {
  const products = await loadCosmeticProducts()

  return products
    .filter((product) => {
      const nameMatch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      const typeMatch = !type || product.product_type === type
      return nameMatch && typeMatch
    })
    .slice(0, 20) // Limit results to 20
}

/**
 * Get a product by name
 */
export async function getProductByName(name: string): Promise<CosmeticProduct | null> {
  const products = await loadCosmeticProducts()

  // Try exact match first
  let product = products.find((p) => p.name.toLowerCase() === name.toLowerCase())

  // If no exact match, try partial match
  if (!product) {
    product = products.find((p) => p.name.toLowerCase().includes(name.toLowerCase()))
  }

  return product || null
}

/**
 * Get products for a specific skin type
 */
export async function getProductsForSkinType(
  skinType: "combination" | "dry" | "normal" | "oily" | "sensitive",
  productType?: string,
): Promise<CosmeticProduct[]> {
  const products = await loadCosmeticProducts()

  return products
    .filter((product) => {
      const skinTypeMatch = product[skinType] === true
      const typeMatch = !productType || product.product_type === productType
      return skinTypeMatch && typeMatch
    })
    .slice(0, 10) // Limit results to 10
}

/**
 * Parse ingredients string into an array
 */
export function parseIngredients(ingredientsStr: string): string[] {
  if (!ingredientsStr) return []

  // Split by common separators and clean up
  return ingredientsStr
    .split(/,|;|\|/)
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient.length > 0)
}

/**
 * Get top-rated products by product type
 */
export async function getTopRatedProducts(productType: string, limit = 5): Promise<CosmeticProduct[]> {
  const products = await loadCosmeticProducts()

  return products
    .filter((product) => product.product_type === productType)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, limit)
}

/**
 * Analyze ingredients for safety concerns
 */
export function analyzeIngredientSafety(ingredients: string[]): {
  safetyScore: number
  concerns: string[]
  safeIngredients: string[]
  questionableIngredients: string[]
} {
  // List of potentially concerning ingredients
  const concerningIngredients = [
    { name: "sodium lauryl sulfate", concern: "Can be irritating to sensitive skin", severity: "medium" },
    { name: "sodium laureth sulfate", concern: "Can be irritating to sensitive skin", severity: "medium" },
    { name: "methylparaben", concern: "Preservative with potential endocrine disruption concerns", severity: "medium" },
    { name: "propylparaben", concern: "Preservative with potential endocrine disruption concerns", severity: "medium" },
    { name: "butylparaben", concern: "Preservative with potential endocrine disruption concerns", severity: "medium" },
    { name: "ethylparaben", concern: "Preservative with potential endocrine disruption concerns", severity: "medium" },
    { name: "fragrance", concern: "Common allergen and irritant", severity: "medium" },
    { name: "parfum", concern: "Common allergen and irritant", severity: "medium" },
    { name: "formaldehyde", concern: "Potential carcinogen", severity: "high" },
    { name: "phthalate", concern: "Potential endocrine disruptor", severity: "high" },
    { name: "triclosan", concern: "Antibacterial with potential hormone effects", severity: "high" },
    { name: "toluene", concern: "Potential neurotoxicity", severity: "high" },
    { name: "resorcinol", concern: "Potential endocrine disruptor", severity: "medium" },
    { name: "hydroquinone", concern: "Potential carcinogen", severity: "high" },
    { name: "bht", concern: "Potential endocrine disruptor", severity: "medium" },
    { name: "bha", concern: "Potential endocrine disruptor", severity: "medium" },
    { name: "polyethylene", concern: "Microplastic environmental concern", severity: "low" },
    { name: "oxybenzone", concern: "Potential hormone disruptor", severity: "medium" },
    { name: "octinoxate", concern: "Potential hormone disruptor", severity: "medium" },
    { name: "dmdm hydantoin", concern: "Formaldehyde releaser", severity: "medium" },
    { name: "imidazolidinyl urea", concern: "Formaldehyde releaser", severity: "medium" },
    { name: "diazolidinyl urea", concern: "Formaldehyde releaser", severity: "medium" },
    { name: "quaternium-15", concern: "Formaldehyde releaser", severity: "medium" },
    { name: "bronopol", concern: "Formaldehyde releaser", severity: "medium" },
    { name: "alcohol denat", concern: "Can be drying and irritating", severity: "low" },
    { name: "isopropyl alcohol", concern: "Can be drying and irritating", severity: "low" },
    { name: "benzyl alcohol", concern: "Potential irritant", severity: "low" },
  ]

  // List of beneficial ingredients
  const beneficialIngredients = [
    "glycerin",
    "hyaluronic acid",
    "sodium hyaluronate",
    "ceramide",
    "niacinamide",
    "panthenol",
    "allantoin",
    "aloe vera",
    "aloe barbadensis",
    "centella asiatica",
    "green tea",
    "camellia sinensis",
    "vitamin e",
    "tocopherol",
    "vitamin c",
    "ascorbic acid",
    "squalane",
    "jojoba oil",
    "argan oil",
    "shea butter",
    "colloidal oatmeal",
    "zinc oxide",
    "titanium dioxide",
    "bisabolol",
  ]

  // Normalize ingredients for comparison
  const normalizedIngredients = ingredients.map((i) => i.toLowerCase())

  // Find concerning ingredients
  const foundConcerns: { name: string; concern: string; severity: string }[] = []
  concerningIngredients.forEach((concern) => {
    if (normalizedIngredients.some((i) => i.includes(concern.name))) {
      foundConcerns.push(concern)
    }
  })

  // Find beneficial ingredients
  const foundBeneficial: string[] = []
  beneficialIngredients.forEach((beneficial) => {
    if (normalizedIngredients.some((i) => i.includes(beneficial))) {
      foundBeneficial.push(beneficial)
    }
  })

  // Calculate safety score
  // Base score of 70
  let safetyScore = 70

  // Add points for beneficial ingredients (up to +20)
  safetyScore += Math.min(foundBeneficial.length * 2, 20)

  // Subtract points for concerning ingredients
  foundConcerns.forEach((concern) => {
    if (concern.severity === "high") {
      safetyScore -= 10
    } else if (concern.severity === "medium") {
      safetyScore -= 5
    } else {
      safetyScore -= 2
    }
  })

  // Ensure score is between 0 and 100
  safetyScore = Math.max(0, Math.min(100, safetyScore))

  return {
    safetyScore: Math.round(safetyScore),
    concerns: foundConcerns.map((c) => c.concern),
    safeIngredients: foundBeneficial,
    questionableIngredients: foundConcerns.map((c) => c.name),
  }
}

/**
 * Compare two products based on their ingredients
 */
export function compareProducts(
  originalIngredients: string[],
  alternativeIngredients: string[],
): {
  matchPercentage: number
  common: string[]
  onlyInOriginal: string[]
  onlyInAlternative: string[]
} {
  // Normalize ingredients for comparison
  const normalizedOriginal = originalIngredients.map((i) => i.toLowerCase())
  const normalizedAlternative = alternativeIngredients.map((i) => i.toLowerCase())

  // Find common ingredients
  const common = normalizedOriginal.filter((ingredient) =>
    normalizedAlternative.some(
      (altIngredient) => altIngredient.includes(ingredient) || ingredient.includes(altIngredient),
    ),
  )

  // Find ingredients only in original
  const onlyInOriginal = normalizedOriginal.filter(
    (ingredient) =>
      !normalizedAlternative.some(
        (altIngredient) => altIngredient.includes(ingredient) || ingredient.includes(altIngredient),
      ),
  )

  // Find ingredients only in alternative
  const onlyInAlternative = normalizedAlternative.filter(
    (ingredient) =>
      !normalizedOriginal.some(
        (origIngredient) => origIngredient.includes(ingredient) || ingredient.includes(ingredient),
      ),
  )

  // Calculate match percentage
  const totalUniqueIngredients = new Set([...normalizedOriginal, ...normalizedAlternative]).size
  const matchPercentage = totalUniqueIngredients > 0 ? Math.round((common.length / totalUniqueIngredients) * 100) : 0

  return {
    matchPercentage,
    common,
    onlyInOriginal,
    onlyInAlternative,
  }
}

/**
 * Generate a recommendation based on comparison results
 */
export function generateRecommendation(
  originalName: string,
  alternativeName: string,
  originalSafetyScore: number,
  alternativeSafetyScore: number,
  matchPercentage: number,
  commonCount: number,
  onlyInOriginalCount: number,
  onlyInAlternativeCount: number,
): string {
  let recommendation = ""

  if (alternativeSafetyScore > originalSafetyScore + 10) {
    recommendation = `${alternativeName} appears to be significantly safer than ${originalName} with fewer potentially harmful ingredients.`
  } else if (originalSafetyScore > alternativeSafetyScore + 10) {
    recommendation = `${originalName} appears to be significantly safer than ${alternativeName}. Consider staying with your current product.`
  } else if (Math.abs(originalSafetyScore - alternativeSafetyScore) <= 10) {
    recommendation = `Both products have similar safety profiles. `

    if (matchPercentage > 70) {
      recommendation += `They share many common ingredients (${matchPercentage}% match), so you might experience similar results with either product.`
    } else if (matchPercentage < 30) {
      recommendation += `However, they have very different ingredient lists (only ${matchPercentage}% match), so they may provide different benefits.`
    } else {
      recommendation += `They have a moderate ingredient overlap (${matchPercentage}% match).`
    }
  }

  if (onlyInAlternativeCount > onlyInOriginalCount * 2) {
    recommendation += ` ${alternativeName} contains significantly more unique ingredients, which might offer additional benefits not found in ${originalName}.`
  } else if (onlyInOriginalCount > onlyInAlternativeCount * 2) {
    recommendation += ` ${originalName} contains significantly more unique ingredients, which might offer benefits not found in ${alternativeName}.`
  }

  return recommendation
}

/**
 * Analyze and compare two products
 */
export async function analyzeAndCompareProducts(
  originalProduct: string,
  originalIngredients: string,
  alternativeProduct: string,
  alternativeIngredients: string,
  productType: string,
): Promise<ComparisonResult> {
  // Parse ingredients
  const parsedOriginalIngredients = parseIngredients(originalIngredients)
  const parsedAlternativeIngredients = parseIngredients(alternativeIngredients)

  // Analyze safety
  const originalSafety = analyzeIngredientSafety(parsedOriginalIngredients)
  const alternativeSafety = analyzeIngredientSafety(parsedAlternativeIngredients)

  // Compare ingredients
  const comparison = compareProducts(parsedOriginalIngredients, parsedAlternativeIngredients)

  // Generate recommendation
  const recommendation = generateRecommendation(
    originalProduct,
    alternativeProduct,
    originalSafety.safetyScore,
    alternativeSafety.safetyScore,
    comparison.matchPercentage,
    comparison.common.length,
    comparison.onlyInOriginal.length,
    comparison.onlyInAlternative.length,
  )

  // Return structured result
  return {
    matchPercentage: comparison.matchPercentage,
    safetyScore: {
      original: originalSafety.safetyScore,
      alternative: alternativeSafety.safetyScore,
    },
    ingredients: {
      common: comparison.common,
      onlyInOriginal: comparison.onlyInOriginal,
      onlyInAlternative: comparison.onlyInAlternative,
    },
    concerns: {
      original: originalSafety.concerns,
      alternative: alternativeSafety.concerns,
    },
    recommendation,
  }
}

