import { openDB } from 'idb';

/**
 * ImageCache Service
 * Manages book cover image caching using IndexedDB
 * Reduces API calls and improves load times for frequently accessed images
 */

// Constants for IndexedDB configuration
const DB_NAME = 'bladBookDB';
const COVERS_STORE = 'bookCovers';

export class ImageCache {
    /**
     * Initializes IndexedDB database and creates object store if needed
     */
    static async initDB() {
        console.log('Initializing IndexedDB...');
        return openDB(DB_NAME, 1, {
            upgrade(db) {
                console.log('Creating object store...');
                if (!db.objectStoreNames.contains(COVERS_STORE)) {
                    db.createObjectStore(COVERS_STORE);
                }
            },
        });
    }

    /**
     * Retrieves image from cache or fetches from API
     * @param {string} coverId - OpenLibrary cover ID
     * @returns {string|null} Object URL for the image or null if not found
     */
    static async getImage(coverId) {
        if (!coverId) {
            console.log('No coverId provided');
            return null;
        }
        
        try {
            const db = await this.initDB();
            
            // Check cache first
            const cached = await db.get(COVERS_STORE, coverId);
            if (cached) {
                console.log('Found in cache:', coverId);
                return URL.createObjectURL(cached);
            }

            console.log('Fetching from API:', coverId);
            const response = await fetch(`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            
            // Store in cache
            await db.put(COVERS_STORE, blob, coverId);

            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error handling image:', error);
            return null;
        }
    }

    /**
     * Debug method to inspect cache contents
     * Logs number of entries, keys, and total cache size
     */
    static async debugCache() {
        try {
            const db = await this.initDB();
            const tx = db.transaction(COVERS_STORE, 'readonly');
            const store = tx.objectStore(COVERS_STORE);
            const keys = await store.getAllKeys();
            const entries = await store.getAll();
            
            console.log('Cache contents:', {
                numberOfEntries: keys.length,
                keys: keys,
                totalSize: entries.reduce((acc, blob) => acc + (blob.size || 0), 0) / 1024 / 1024, // Size in MB
            });
        } catch (error) {
            console.error('Error debugging cache:', error);
        }
    }
} 