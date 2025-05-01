import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { PhoneNumberGroup } from '../../models/school-registration.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const data = this.registrationService.registrationData;
    
    this.contactForm = this.fb.group({
      phoneNumberGroups: this.fb.array([])
    });

    // Load existing phone number groups or create default
    if (data.phoneNumberGroups && data.phoneNumberGroups.length > 0) {
      data.phoneNumberGroups.forEach(group => {
        this.addPhoneNumberGroup(group);
      });
    } else {
      this.addPhoneNumberGroup({ name: 'General', phoneNumbers: [] });
    }

    // Auto-save form changes
    this.contactForm.valueChanges.subscribe(values => {
      this.saveChanges();
    });
  }

  get phoneNumberGroups(): FormArray {
    return this.contactForm.get('phoneNumberGroups') as FormArray;
  }

  phoneNumbers(groupIndex: number): FormArray {
    return this.phoneNumberGroups.at(groupIndex).get('phoneNumbers') as FormArray;
  }

  addPhoneNumberGroup(group?: PhoneNumberGroup): void {
    const groupForm = this.fb.group({
      name: [group?.name || '', Validators.required],
      phoneNumbers: this.fb.array([])
    });

    if (group?.phoneNumbers && group.phoneNumbers.length > 0) {
      group.phoneNumbers.forEach(phone => {
        this.addPhoneNumber(
          this.phoneNumberGroups.length, 
          phone.name, 
          phone.value
        );
      });
    } else {
      // Add at least one empty phone number to the group
      this.phoneNumberGroups.push(groupForm);
      this.addPhoneNumber(this.phoneNumberGroups.length - 1);
    }
  }

  addPhoneNumber(groupIndex: number, name: string = '', value: string = ''): void {
    const phoneForm = this.fb.group({
      name: [name, Validators.required],
      value: [value, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    // First, make sure the group exists
    if (groupIndex >= this.phoneNumberGroups.length) {
      return;
    }

    const phoneNumbers = this.phoneNumbers(groupIndex);
    phoneNumbers.push(phoneForm);
  }

  removePhoneNumberGroup(index: number): void {
    this.phoneNumberGroups.removeAt(index);
    this.saveChanges();
  }

  removePhoneNumber(groupIndex: number, phoneIndex: number): void {
    const phoneNumbers = this.phoneNumbers(groupIndex);
    if (phoneNumbers.length > 1) {
      phoneNumbers.removeAt(phoneIndex);
      this.saveChanges();
    }
  }

  saveChanges(): void {
    if (this.contactForm.valid) {
      this.registrationService.updatePhoneNumberGroups(
        this.contactForm.value.phoneNumberGroups
      );
    }
  }
}