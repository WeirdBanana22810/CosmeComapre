import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    instructions: [
      "To use the AI features of CosmeCompare, you need to set up your OpenAI API key.",
      "Create a .env.local file in the root of your project with the following content:",
      "OPENAI_API_KEY=your_openai_api_key_here",
      "You can get an API key from https://platform.openai.com/api-keys",
    ],
    fallbackMode: "If you don't set up an API key, the application will use fallback data for demonstrations.",
  })
}

