import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // In production, use a service account. In development, use project ID only
  // (requires GOOGLE_APPLICATION_CREDENTIALS env or Firebase emulator).
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ) as ServiceAccount;
    return initializeApp({ credential: cert(serviceAccount) });
  }

  return initializeApp({ projectId });
}

const adminApp = getAdminApp();
const adminAuth = getAuth(adminApp);

/**
 * Verify a Firebase ID token from the Authorization header.
 * Returns the decoded token on success, or null on failure.
 */
export async function verifyAuthToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice(7);
  try {
    return await adminAuth.verifyIdToken(token);
  } catch {
    return null;
  }
}
