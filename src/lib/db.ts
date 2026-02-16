import { db } from "./firebase";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";
import { BusinessData } from "@/types/business";

export interface Site extends BusinessData {
    id: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
}

const SITES_COLLECTION = "sites";

/**
 * Save a site to Firestore.
 */
export async function saveSite(userId: string, siteData: BusinessData, siteId?: string): Promise<string> {
    const id = siteId || crypto.randomUUID();
    const siteRef = doc(db, SITES_COLLECTION, id);

    const now = Date.now();

    const data: Site = {
        ...siteData,
        id,
        userId,
        createdAt: siteId ? (await getSite(siteId))?.createdAt || now : now,
        updatedAt: now,
    };

    await setDoc(siteRef, data, { merge: true });
    return id;
}

/**
 * Get all sites for a specific user.
 */
export async function getUserSites(userId: string): Promise<Site[]> {
    const sitesRef = collection(db, SITES_COLLECTION);
    const q = query(sitesRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const sites: Site[] = [];

    querySnapshot.forEach((doc) => {
        sites.push(doc.data() as Site);
    });

    return sites.sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Get a single site by ID.
 */
export async function getSite(siteId: string): Promise<Site | null> {
    const siteRef = doc(db, SITES_COLLECTION, siteId);
    const docSnap = await getDoc(siteRef);

    if (docSnap.exists()) {
        return docSnap.data() as Site;
    } else {
        return null;
    }
}

/**
 * Delete a site by ID.
 */
export async function deleteSite(siteId: string): Promise<void> {
    const siteRef = doc(db, SITES_COLLECTION, siteId);
    await deleteDoc(siteRef);
}

/**
 * Update a site with new data.
 */
export async function updateSite(siteId: string, siteData: Partial<BusinessData>): Promise<void> {
    const siteRef = doc(db, SITES_COLLECTION, siteId);
    await setDoc(siteRef, { ...siteData, updatedAt: Date.now() }, { merge: true });
}
