import { GridSize } from "@mui/material";

export interface Ad {
  id: number;
  title: string;
  adType: string;
  propertyCategory: string;
  propertyCondition: string;
  propertyFloor: string;
  propertysize: number;
  buildDate: number | null;
  renovationDate: number | null;
  bedrooms: number;
  masterBedrooms: number;
  bathrooms: number;
  WC: number;
  energyClass: string;
  price: number;
  propertyZone: string;
  extraInfo: string | null;
  contactEmail: string;
  contactPhone: number;
  contactHoursFrom: string;
  contactHoursTo: string;
  created_at: number;
  location: {
    id: number;
    placeID: string;
    primaryAddress: string;
    secondaryAddress: string;
  };
}

export interface GetAdsResponse {
  success: boolean;
  ads: Ad[];
}

export type ResponsiveSize = {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

export enum adTypes {
  rent = "Rent",
  buy = "Buy",
  exchange = "Exchange",
  donation = "Donation",
}
export enum propertyTypes {
  apartment = "Apartment",
  building = "Building",
  maisonette = "Maisonette",
  singleHomeApartment = "Single Home Apartment",
}

export enum stateOfProperty {
  unfinished = "Unfinished",
  neonate = "Neonate",
  underConstruction = "Under Construction",
  renovated = "Renovated",
  goodCondition = "In Good Condition",
  renovationNeeded = "Needs renovation",
}

export enum propertyFlorr {
  basement = "Basement",
  semiBasement = "Semi-Basement",
  groundFloor = "Ground Floor",
  elevated = "Elevated",
  halfFloor = "Half-Floor",
  first = "1st",
  second = "2nd",
  third = "3rd",
  forth = "4th",
  fifth = "5th",
  sixth = "6th",
  seventh = "7th",
  eighthPlus = "8th+",
}
export enum energyClass {
  "A+" = "A+",
  A = "A",
  "B+" = "B+",
  C = "C",
  D = "D",
  E = "E",
  Z = "Z",
  H = "H",
  exempt = "Exempt",
  underIssue = "Under Issue",
}

export enum Zone {
  domestic = "Domestic",
  commercial = "Commercial",
  industrial = "Industrial",
}

export const propertyTypesMapper = {
  [propertyTypes.apartment]: "Apartment",
  [propertyTypes.building]: "Building",
  [propertyTypes.maisonette]: "Maisonette",
  [propertyTypes.singleHomeApartment]: "Single Home Apartment",
};

export const adTypeMapper = {
  [adTypes.rent]: "For Rent",
  [adTypes.buy]: "For Sale",
  [adTypes.exchange]: "For Exchange",
  [adTypes.donation]: "For Donation",
};

// State of Property Mapper
export const stateOfPropertyMapper = {
  [stateOfProperty.unfinished]: "Unfinished",
  [stateOfProperty.neonate]: "Neonate",
  [stateOfProperty.underConstruction]: "Under Construction",
  [stateOfProperty.renovated]: "Renovated",
  [stateOfProperty.goodCondition]: "In Good Condition",
  [stateOfProperty.renovationNeeded]: "Needs renovation",
} as const;

// Property Floor Mapper
export const propertyFloorMapper = {
  [propertyFlorr.basement]: "Basement",
  [propertyFlorr.semiBasement]: "Semi-Basement",
  [propertyFlorr.groundFloor]: "Ground Floor",
  [propertyFlorr.elevated]: "Elevated",
  [propertyFlorr.halfFloor]: "Half-Floor",
  [propertyFlorr.first]: "1st",
  [propertyFlorr.second]: "2nd",
  [propertyFlorr.third]: "3rd",
  [propertyFlorr.forth]: "4th",
  [propertyFlorr.fifth]: "5th",
  [propertyFlorr.sixth]: "6th",
  [propertyFlorr.seventh]: "7th",
  [propertyFlorr.eighthPlus]: "8th+",
} as const;

// Energy Class Mapper
export const energyClassMapper = {
  [energyClass["A+"]]: "A+",
  [energyClass.A]: "A",
  [energyClass["B+"]]: "B+",
  [energyClass.C]: "C",
  [energyClass.D]: "D",
  [energyClass.E]: "E",
  [energyClass.Z]: "Z",
  [energyClass.H]: "H",
  [energyClass.exempt]: "Exempt",
  [energyClass.underIssue]: "Under Issue",
} as const;

// Zone Mapper
export const zoneMapper = {
  [Zone.domestic]: "Domestic",
  [Zone.commercial]: "Commercial",
  [Zone.industrial]: "Industrial",
} as const;

export enum Hours {
  hour0 = "00:00",
  hour1 = "01:00",
  hour2 = "02:00",
  hour3 = "03:00",
  hour4 = "04:00",
  hour5 = "05:00",
  hour6 = "06:00",
  hour7 = "07:00",
  hour8 = "08:00",
  hour9 = "09:00",
  hour10 = "10:00",
  hour11 = "11:00",
  hour12 = "12:00",
  hour13 = "13:00",
  hour14 = "14:00",
  hour15 = "15:00",
  hour16 = "16:00",
  hour17 = "17:00",
  hour18 = "18:00",
  hour19 = "19:00",
  hour20 = "20:00",
  hour21 = "21:00",
  hour22 = "22:00",
  hour23 = "23:00",
}

export const hoursMapper = {
  [Hours.hour0]: "00:00",
  [Hours.hour1]: "01:00",
  [Hours.hour2]: "02:00",
  [Hours.hour3]: "03:00",
  [Hours.hour4]: "04:00",
  [Hours.hour5]: "05:00",
  [Hours.hour6]: "06:00",
  [Hours.hour7]: "07:00",
  [Hours.hour8]: "08:00",
  [Hours.hour9]: "09:00",
  [Hours.hour10]: "10:00",
  [Hours.hour11]: "11:00",
  [Hours.hour12]: "12:00",
  [Hours.hour13]: "13:00",
  [Hours.hour14]: "14:00",
  [Hours.hour15]: "15:00",
  [Hours.hour16]: "16:00",
  [Hours.hour17]: "17:00",
  [Hours.hour18]: "18:00",
  [Hours.hour19]: "19:00",
  [Hours.hour20]: "20:00",
  [Hours.hour21]: "21:00",
  [Hours.hour22]: "22:00",
  [Hours.hour23]: "23:00",
} as const;

export interface createAnAdForm {
  title: string;
  locationTextfieldName: string;
  primaryAddress: string;
  secondaryAddress: string;
  placeID: string;
  predictions:
    | {
        placeID: string;
        mainText: string;
        secondaryText: string;
      }[]
    | null;
  adType: string;
  propertyCategory: string;
  propertyCondition: string;
  propertyFloor: string[] | string;
  propertysize: number | string;
  buildDate: number | string;
  renovationDate: number | string;
  bedrooms: number | string;
  masterBedrooms: number | string;
  bathrooms: number | string;
  WC: number | string;
  energyClass: string;
  price: number | string;
  propertyZone: string;
  extraInfo: string;
  contactInfo: {
    email: string;
    phone: number | string;
    contactHoursFrom: string;
    contactHoursTo: string;
  };
}
