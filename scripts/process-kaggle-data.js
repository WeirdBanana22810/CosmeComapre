const fs = require("fs")
const path = require("path")
const csv = require("csv-parse/sync")
const AdmZip = require("adm-zip")

// Path to your Kaggle zip file
const kaggleZipPath = path.join(__dirname, "../kaggle-dataset.zip")

// Directory to extract data
const dataDir = path.join(__dirname, "../data")

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

// Function to extract the zip file
function extractZipFile() {
  console.log("Extracting Kaggle dataset...")

  try {
    const zip = new AdmZip(kaggleZipPath)
    zip.extractAllTo(dataDir, true)
    console.log("Extraction complete!")

    // Find CSV files
    const files = fs.readdirSync(dataDir)
    const csvFiles = files.filter((file) => file.endsWith(".csv"))

    if (csvFiles.length === 0) {
      console.log("No CSV files found in the zip archive.")
      return
    }

    // Process each CSV file
    csvFiles.forEach((csvFile) => {
      console.log(`Processing ${csvFile}...`)
      processCSVFile(path.join(dataDir, csvFile))
    })
  } catch (error) {
    console.error("Error extracting or processing zip file:", error)
  }
}

// Function to process a CSV file
function processCSVFile(filePath) {
  try {
    // Read the CSV file
    const fileContent = fs.readFileSync(filePath, "utf8")

    // Parse CSV data
    const records = csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    })

    console.log(`Found ${records.length} records in ${path.basename(filePath)}`)

    // If this is the skincare_products.csv file, we'll use it directly
    if (path.basename(filePath) === "skincare_products.csv") {
      console.log("Found skincare_products.csv, using it directly")
    } else {
      // For other CSV files, we'll copy them to a standard name
      const newPath = path.join(dataDir, "skincare_products.csv")
      fs.copyFileSync(filePath, newPath)
      console.log(`Copied to ${newPath}`)
    }

    // Create empty JSON files for our app to use
    const jsonFiles = ["comparisons.json", "recommendations.json", "safety_scores.json"]

    jsonFiles.forEach((jsonFile) => {
      const jsonPath = path.join(dataDir, jsonFile)
      if (!fs.existsSync(jsonPath)) {
        fs.writeFileSync(jsonPath, "[]")
        console.log(`Created empty ${jsonFile}`)
      }
    })
  } catch (error) {
    console.error(`Error processing CSV file ${filePath}:`, error)
  }
}

// If the zip file doesn't exist but the CSV does, just process the CSV
if (!fs.existsSync(kaggleZipPath) && fs.existsSync(path.join(dataDir, "skincare_products.csv"))) {
  console.log("Kaggle zip file not found, but skincare_products.csv exists. Processing directly...")
  processCSVFile(path.join(dataDir, "skincare_products.csv"))
} else {
  // Run the extraction and processing
  extractZipFile()
}

