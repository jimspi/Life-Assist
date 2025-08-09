import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image, filename, userContext } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const contextPrompt = userContext 
      ? `User context: "${userContext}"\n\n` 
      : '';

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${contextPrompt}Analyze this image and provide a detailed JSON response with the following structure:
              {
                "category": "string (categorize based on what you see - could be anything: food, clothing, electronics, tools, furniture, plants, vehicles, art, etc.)",
                "items": [
                  {
                    "name": "string (specific item name)",
                    "quantity": "string (estimated quantity if applicable)",
                    "confidence": "number (0-1 confidence in identification)"
                  }
                ],
                "project_suggestions": ["array of relevant project ideas, activities, or use cases based on detected items and user context"],
                "price_comparison": [
                  {
                    "store": "string (relevant retailers/suppliers for this category)",
                    "price": "string (estimated price per unit)",
                    "per": "string (each, pound, bundle, etc.)",
                    "total": "string (estimated total cost)",
                    "availability": "string (availability status)"
                  }
                ],
                "recommendations": ["array of helpful recommendations based on the content and user context"]
              }
              
              Instructions:
              1. Identify ALL visible items accurately, regardless of category
              2. Provide relevant price estimates from appropriate retailers (not just home improvement stores)
              3. Suggest practical projects, recipes, activities, or use cases based on what you see
              4. Offer helpful recommendations that match the user's apparent intent
              5. Consider the user context if provided to tailor suggestions
              6. For different categories, suggest relevant retailers:
                 - Food: grocery stores, specialty markets, online food retailers
                 - Electronics: Best Buy, Amazon, specialty tech stores
                 - Clothing: department stores, online retailers, specialty shops
                 - Home items: Home Depot, Target, IKEA, Amazon
                 - Art supplies: art stores, craft stores, online suppliers
                 - etc.
              
              Be specific, practical, and tailor your response to what the user actually uploaded and their stated goals.`
            },
            {
              type: "image_url",
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ 
      success: true, 
      analysis,
      filename,
      userContext: userContext || null
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    const fallbackAnalysis = {
      category: "General Content",
      items: [
        {
          name: "Detected Item",
          quantity: "1",
          confidence: 0.75
        }
      ],
      project_suggestions: [
        "Explore creative uses for this item",
        "Research similar products or alternatives"
      ],
      price_comparison: [
        {
          store: "Amazon",
          price: "Varies",
          per: "each",
          total: "Contact for pricing",
          availability: "Available"
        },
        {
          store: "Local Retailers",
          price: "Varies",
          per: "each", 
          total: "Visit store",
          availability: "Check locally"
        }
      ],
      recommendations: [
        "Research the item online for more information",
        "Compare prices across multiple sources",
        "Consider your specific needs and budget"
      ]
    };

    return NextResponse.json({ 
      success: true, 
      analysis: fallbackAnalysis,
      note: "Using fallback analysis - OpenAI API unavailable"
    });
  }
}
