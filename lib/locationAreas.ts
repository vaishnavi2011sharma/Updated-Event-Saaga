import type { LocationSlug } from "./locations/config";

/**
 * Real neighbourhood/area names per city — used to give location pages genuine
 * local specificity (not just the city name swapped into a template). These are
 * well-known, factual localities within each city.
 */
export const LOCATION_AREAS: Record<LocationSlug, string[]> = {
  delhi: ["South Delhi", "Dwarka", "Rohini", "Vasant Kunj", "Saket", "Greater Kailash", "Pitampura", "Karol Bagh"],
  noida: ["Sector 62", "Sector 18", "Greater Noida", "Sector 137", "Noida Extension", "Sector 50", "Sector 76"],
  gurgaon: ["DLF Phase 1-5", "Sohna Road", "Golf Course Road", "Sector 56", "MG Road", "Cyber City", "Sushant Lok"],
  faridabad: ["Sector 15", "NIT Faridabad", "Greenfield Colony", "Old Faridabad", "Sector 21", "Ballabgarh"],
  ghaziabad: ["Indirapuram", "Vaishali", "Raj Nagar Extension", "Kaushambi", "Vasundhara", "Crossings Republik"],
  bangalore: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "Electronic City", "Malleshwaram"],
  mumbai: ["Bandra", "Andheri", "Powai", "Juhu", "Malad", "Thane", "Navi Mumbai", "Worli"],
  pune: ["Koregaon Park", "Baner", "Viman Nagar", "Kothrud", "Hinjewadi", "Aundh", "Wakad"],
  hyderabad: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Madhapur", "Kondapur", "Secunderabad", "Hitech City"],
  chennai: ["T Nagar", "Anna Nagar", "Adyar", "Velachery", "OMR", "ECR", "Nungambakkam", "Besant Nagar"],
  kolkata: ["Salt Lake", "Park Street", "New Town", "Ballygunge", "Alipore", "Rajarhat", "Behala"],
  ahmedabad: ["Satellite", "Bodakdev", "Prahlad Nagar", "Vastrapur", "SG Highway", "Navrangpura", "Maninagar"],
  jaipur: ["Malviya Nagar", "C-Scheme", "Vaishali Nagar", "Mansarovar", "Jagatpura", "Civil Lines", "Tonk Road"],
  lucknow: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Alambagh", "Jankipuram"],
  chandigarh: ["Sector 17", "Sector 22", "Sector 35", "Panchkula", "Mohali", "Sector 8", "Zirakpur"],
  surat: ["Vesu", "Adajan", "Piplod", "Athwa", "City Light", "Katargam"],
  indore: ["Vijay Nagar", "Palasia", "Rajwada", "Bhawarkuan", "Scheme 78", "AB Road"],
  bhopal: ["Arera Colony", "MP Nagar", "New Market", "Kolar Road", "Shahpura", "Bawadiya Kalan"],
  nagpur: ["Civil Lines", "Dharampeth", "Sadar", "Wardha Road", "Manish Nagar", "Sitabuldi"],
  kochi: ["Kakkanad", "Marine Drive", "Edappally", "Fort Kochi", "Vyttila", "Panampilly Nagar"],
};
