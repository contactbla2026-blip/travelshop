import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Safely parses a JSON string into a typed object.
 * Returns the fallback value if parsing fails or if input is not a string (unless it's already the object).
 * 
 * @param input The JSON string or pre-parsed object
 * @param fallback The default value to return on failure
 * @returns The parsed object or fallback
 */
export function safeJSONParse<T>(input: string | any, fallback: T): T {
    if (typeof input !== 'string') {
        // If it's already an object/array, return it (assuming it matches T)
        return input || fallback;
    }
    try {
        return JSON.parse(input) as T;
    } catch (e) {
        console.error('Failed to parse JSON:', e);
        return fallback;
    }
}
