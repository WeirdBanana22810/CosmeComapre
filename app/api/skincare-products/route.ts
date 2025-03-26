import { NextResponse } from "next/server"

// This is a simplified version of the Kaggle dataset
// In a real implementation, you would process the full dataset
export async function GET() {
  try {
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
      // Add more products from the Kaggle dataset
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

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error serving skincare products:", error)
    return NextResponse.json({ error: "Failed to fetch skincare products" }, { status: 500 })
  }
}

