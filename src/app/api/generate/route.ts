import { NextResponse } from 'next/server';
import { z } from 'zod';
import { BusinessData } from '@/types/business';
import { verifyAuthToken } from '@/lib/auth-server';

const generateSchema = z.object({
    prompt: z.string().min(1, "Prompt is required").max(5000, "Prompt must be under 5000 characters"),
});

// Mock response for now until API key is added
const MOCK_RESPONSE: BusinessData = {
    businessName: "Joe's Pizza",
    heroHeadline: "Best Pizza in Town",
    heroSubheadline: "Fresh ingredients, wood-fired oven, family recipe.",
    primaryColor: "#d93025", // Red
    services: [
        { name: "Pepperoni Pizza", description: "Classic pepperoni", price: "$18" },
        { name: "Margherita", description: "Fresh basil and mozzarella", price: "$16" }
    ],
    contact: {
        phone: "555-PIZZA",
        address: "123 Main St"
    }
};

export async function POST(req: Request) {
    try {
        // Verify authentication
        const decodedToken = await verifyAuthToken(req);
        if (!decodedToken) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Validate input
        const body = await req.json();
        const parsed = generateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: parsed.error.issues },
                { status: 400 }
            );
        }

        const { prompt } = parsed.data;

        // TODO: Connect to OpenAI here
        // const completion = await openai.chat.completions.create({...})

        // For now, return mock data if the prompt contains "pizza", else return default
        if (prompt.toLowerCase().includes('pizza')) {
            return NextResponse.json(MOCK_RESPONSE);
        }

        return NextResponse.json({
            ...MOCK_RESPONSE,
            businessName: "Generated Business",
            heroHeadline: "Your Website is Ready"
        });

    } catch (error) {
        console.error('Error generating site:', error);
        return NextResponse.json(
            { error: 'Failed to generate site' },
            { status: 500 }
        );
    }
}
