import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolRegistration } from '../models/school-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  registrationData: SchoolRegistration = {
    name: '',
    legalName: '',
    ownerEmail: '',
    schoolEmail: '',
    ownerPassword: '',
    ownerFirstName: '',
    ownerLastName: '',
    city: '',
    address: '',
    phoneNumber: '',
    imagePath: '',
    imageContentType: '',
    phoneNumberGroups: [],
    websiteLink: {
      url: '',
      name: '',
      description: '',
      iconData: {
        fileName: '',
        url: '',
        contentType: '',
        description: ''
      }
    },
    socialMediaLinks: [],
    bussinessHours: [],
    vechiclesCategories: [],
    arrCertifications: []
  };

  constructor(private http: HttpClient) { }

  submitRegistration(): Observable<any> {
    const apiUrl = `https://localhost:7022/schools`;
    return this.http.post(apiUrl, this.registrationData);
  }

  // Helper methods for each step to update the registration data
  updateBasicInfo(data: Partial<SchoolRegistration>): void {
    this.registrationData = { ...this.registrationData, ...data };
  }

  updateOwnerInfo(data: Partial<SchoolRegistration>): void {
    this.registrationData = { ...this.registrationData, ...data };
  }

  updatePhoneNumberGroups(phoneNumberGroups: any[]): void {
    this.registrationData.phoneNumberGroups = phoneNumberGroups;
  }

  updateWebsiteLink(websiteLink: any): void {
    this.registrationData.websiteLink = websiteLink;
  }

  updateSocialMediaLinks(socialMediaLinks: any[]): void {
    this.registrationData.socialMediaLinks = socialMediaLinks;
  }

  updateBusinessHours(businessHours: any[]): void {
    this.registrationData.bussinessHours = businessHours;
  }

  updateServices(vechiclesCategories: string[], certifications: string[]): void {
    this.registrationData.vechiclesCategories = vechiclesCategories;
    this.registrationData.arrCertifications = certifications;
  }

  // Method to validate a specific step
  validateStep(step: number): boolean {
    switch (step) {
      case 0: // Basic Info
        return !!this.registrationData.name && !!this.registrationData.legalName;
      case 1: // Owner Info
        return !!this.registrationData.ownerEmail && 
               !!this.registrationData.ownerPassword && 
               !!this.registrationData.ownerFirstName && 
               !!this.registrationData.ownerLastName;
      case 2: // Contact Info
        return !!this.registrationData.phoneNumber;
      case 3: // Online Presence
        return true; // Optional step
      case 4: // Business Hours
        return this.registrationData.bussinessHours.length > 0;
      case 5: // Services
        return this.registrationData.vechiclesCategories.length > 0;
      case 6: // Review
        return true; // Just reviewing, no validation needed
      default:
        return false;
    }
  }
}
