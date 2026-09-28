"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { LocationSlug } from "@/lib/locations/config";
import { isValidLocation, LOCATION_DISPLAY } from "@/lib/locations/config";

const COOKIE_NAME  = "eventsaaga_location";
const LS_KEY       = "eventsaaga_location";
const COOKIE_DAYS  = 30;

interface LocationContextValue {
  location: LocationSlug | null;
  locationName: string | null;
  setLocation: (slug: LocationSlug, redirect?: boolean) => void;
  clearLocation: () => void;
  showPopup: boolean;
  setShowPopup: (v: boolean) => void;
}

const LocationContext = createContext<LocationContextValue>({
  location: null,
  locationName: null,
  setLocation: () => {},
  clearLocation: () => {},
  showPopup: false,
  setShowPopup: () => {},
});

export function useLocation() {
  return useContext(LocationContext);
}

// ── helpers ────────────────────────────────────────────────────────────────
function setCookie(value: string) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 86400 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}
function getCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
function deleteCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
function saveLocation(slug: string) {
  setCookie(slug);
  try { localStorage.setItem(LS_KEY, slug); } catch {}
}
function readSavedLocation(): string | null {
  const cookie = getCookie();
  if (cookie) return cookie;
  try { return localStorage.getItem(LS_KEY); } catch { return null; }
}

// ── provider ───────────────────────────────────────────────────────────────
export function LocationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [location, setLoc] = useState<LocationSlug | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // One-time sync from persisted client storage (cookie/localStorage) into
    // React state on mount. This must stay inside an effect (not a lazy
    // initializer) because it reads browser-only APIs unavailable during SSR.
    const saved = readSavedLocation();
    if (saved && isValidLocation(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time hydration from browser storage, not a cascading render
      setLoc(saved as LocationSlug);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time hydration from browser storage, not a cascading render
      setShowPopup(true);
    }
  }, []);

  const setLocation = useCallback((slug: LocationSlug, redirect = true) => {
    saveLocation(slug);
    setLoc(slug);
    setShowPopup(false);
    if (redirect) router.push(`/${slug}`);
  }, [router]);

  const clearLocation = useCallback(() => {
    deleteCookie();
    try { localStorage.removeItem(LS_KEY); } catch {}
    setLoc(null);
    setShowPopup(true);
  }, []);

  return (
    <LocationContext.Provider value={{
      location,
      locationName: location ? LOCATION_DISPLAY[location] : null,
      setLocation,
      clearLocation,
      showPopup,
      setShowPopup,
    }}>
      {children}
    </LocationContext.Provider>
  );
}
