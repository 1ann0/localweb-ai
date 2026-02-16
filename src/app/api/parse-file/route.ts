import { NextResponse } from 'next/server';
import { BusinessData } from '@/types/business';
import { verifyAuthToken } from '@/lib/auth-server';

const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
        // Verify authentication
        const decodedToken = await verifyAuthToken(req);
        if (!decodedToken) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate MIME type
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: `Invalid file type: ${file.type}. Allowed: PDF, JPEG, PNG` },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File too large. Maximum size is 10MB` },
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
