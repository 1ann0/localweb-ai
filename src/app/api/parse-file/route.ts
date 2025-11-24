import { NextResponse } from 'next/server';
import { BusinessData } from '@/types/business';

// Mock response for file upload
const MOCK_FILE_RESPONSE: BusinessData = {
    businessName: "Uploaded Business Inc.",
    heroHeadline: "Extracted from your file",
    heroSubheadline: "We analyzed your uploaded document and generated this site.",
    primaryColor: "#2e7d32", // Green
    services: [
        { name: "Extracted Service 1", description: "Found in PDF", price: "$99" },
        { name: "Extracted Service 2", description: "Found in PDF", price: "$199" }
    ],
    contact: {
        phone: "555-FILE",
        address: "123 Upload Lane"
    }
};

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // TODO: Process file with OpenAI Vision / PDF Parse here
        // const text = await parsePdf(file);
        // const data = await extractData(text);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json(MOCK_FILE_RESPONSE);

    } catch (error) {
        console.error('Error parsing file:', error);
        return NextResponse.json(
            { error: 'Failed to parse file' },
            { status: 500 }
        );
    }
}
