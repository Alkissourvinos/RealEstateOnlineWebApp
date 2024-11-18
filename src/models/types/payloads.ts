export interface getAdsByUserIDPayload {
  userID: number;
}

export interface createAndSaveAd {
  title: string;
  primaryAddress: string;
  secondaryAddress: string;
  placeID: string;
  adType: string;
  propertyCategory: string;
  propertyCondition: string;
  propertyFloor: string;
  propertysize: number;
  buildDate: number;
  renovationDate: number;
  bedrooms: number;
  masterBedrooms: number;
  bathrooms: number;
  WC: number;
  energyClass: string;
  price: number;
  propertyZone: string;
  extraInfo: string;
  contactInfo: {
    email: string;
    phone: number;
    contactHoursFrom: string;
    contactHoursTo: string;
  };
}
