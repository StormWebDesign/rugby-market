import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Generate a URL-safe slug from first and last name
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string} slug like "john.smith"
 */
export const generateSlug = (firstName, lastName) => {
  if (!firstName || !lastName) return "";

  const sanitize = (str) => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]/g, "") // Remove non-alphanumeric
      .substring(0, 25); // Limit length
  };

  const first = sanitize(firstName);
  const last = sanitize(lastName);

  if (!first || !last) return "";

  return `${first}.${last}`;
};

/**
 * Sanitize and validate a custom slug
 * @param {string} slug
 * @returns {string} sanitized slug
 */
export const sanitizeSlug = (slug) => {
  if (!slug) return "";

  return slug
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9.-]/g, "") // Keep only alphanumeric, dots, hyphens
    .replace(/\.+/g, ".") // Replace multiple dots with single
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^[.-]+|[.-]+$/g, "") // Remove leading/trailing dots and hyphens
    .substring(0, 50); // Limit length
};

/**
 * Validate slug format
 * @param {string} slug
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateSlug = (slug) => {
  if (!slug) {
    return { valid: false, error: "Profile URL is required" };
  }

  if (slug.length < 3) {
    return { valid: false, error: "Profile URL must be at least 3 characters" };
  }

  if (slug.length > 50) {
    return { valid: false, error: "Profile URL must be less than 50 characters" };
  }

  if (!slug.includes(".")) {
    return { valid: false, error: "Profile URL must contain a dot (e.g., john.smith)" };
  }

  if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(slug)) {
    return { valid: false, error: "Profile URL can only contain lowercase letters, numbers, dots, and hyphens" };
  }

  // Check for reserved slugs
  const reserved = [
    "about", "contact", "login", "register", "admin", "api",
    "job-listings", "employers", "candidates", "blog", "shop",
    "faq", "terms", "pricing", "invoice", "404"
  ];

  if (reserved.some(r => slug.startsWith(r))) {
    return { valid: false, error: "This URL is reserved. Please choose a different one." };
  }

  return { valid: true };
};

/**
 * Check if a slug is available in Firestore
 * @param {string} slug
 * @param {string} currentUserId - exclude this user from check (for editing)
 * @returns {Promise<boolean>} true if available
 */
export const checkSlugAvailability = async (slug, currentUserId = null) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("profileSlug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return true;
    }

    // If checking for current user editing their own profile
    if (currentUserId) {
      return snapshot.docs.every(doc => doc.id === currentUserId);
    }

    return false;
  } catch (error) {
    console.error("Error checking slug availability:", error);
    return false;
  }
};

/**
 * Fetch a user profile by slug
 * @param {string} slug
 * @returns {Promise<{ userId: string, data: object } | null>}
 */
export const getProfileBySlug = async (slug) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("profileSlug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      userId: doc.id,
      data: doc.data()
    };
  } catch (error) {
    console.error("Error fetching profile by slug:", error);
    return null;
  }
};
