import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { RegistrationService } from '../services/registration.service';
import { SchoolRegistration } from '../models/school-registration.model';

@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.scss']
})
export class SchoolRegistrationComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  
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
  
  steps = [
    { label: 'Basic Info', completed: false },
    { label: 'Owner Details', completed: false },
    { label: 'Contact Info', completed: false },
    { label: 'Online Presence', completed: false },
    { label: 'Business Hours', completed: false },
    { label: 'Services', completed: false },
    { label: 'Review', completed: false }
  ];
  
  currentStep = 0;
  
  constructor(private registrationService: RegistrationService) { }
  
  ngOnInit(): void {
    this.registrationService.registrationData = this.registrationData;
  }
  
  onNext(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].completed = true;
      this.currentStep++;
      this.stepper.next();
    }
  }
  
  onPrevious(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepper.previous();
    }
  }
  
  onStepChange(index: number): void {
    this.currentStep = index;
  }
  
  onSubmit(): void {
    this.registrationService.submitRegistration().subscribe(
      response => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., show success message, redirect)
      },
      error => {
        console.error('Registration failed', error);
        // Handle error (e.g., show error message)
      }
    );
  }
  
  canSubmit(): boolean {
    // Add validation logic to determine if form can be submitted
    return this.steps.every(step => step.completed);
  }
}