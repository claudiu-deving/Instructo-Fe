export interface SchoolRegistration {
    name: string;
    legalName: string;
    ownerEmail: string;
    schoolEmail: string;
    ownerPassword: string;
    ownerFirstName: string;
    ownerLastName: string;
    city: string;
    address: string;
    phoneNumber: string;
    imagePath: string;
    imageContentType: string;
    phoneNumberGroups: PhoneNumberGroup[];
    websiteLink: WebsiteLink;
    socialMediaLinks: SocialMediaLink[];
    bussinessHours: BusinessHours[];
    vechiclesCategories: string[];
    arrCertifications: string[];
  }
  
  export interface PhoneNumberGroup {
    name: string;
    phoneNumbers: {
      value: string;
      name: string;
    }[];
  }
  
  export interface WebsiteLink {
    url: string;
    name: string;
    description: string;
    iconData: {
      fileName: string;
      url: string;
      contentType: string;
      description: string;
    };
  }
  
  export interface SocialMediaLink {
    url: string;
    socialPlatformName: string;
  }
  
  export interface BusinessHours {
    daysOfTheWeek: string[];
    intervals: {
      startingHourAndMinute: string;
      endingHourAndMinute: string;
    }[];
  }