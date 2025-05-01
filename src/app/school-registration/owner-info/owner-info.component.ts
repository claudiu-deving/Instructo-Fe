import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})
export class OwnerInfoComponent implements OnInit {
  ownerInfoForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const data = this.registrationService.registrationData;
    
    this.ownerInfoForm = this.fb.group({
      ownerFirstName: [data.ownerFirstName, [Validators.required]],
      ownerLastName: [data.ownerLastName, [Validators.required]],
      ownerEmail: [data.ownerEmail, [Validators.required, Validators.email]],
      ownerPassword: [data.ownerPassword, [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });

    // Auto-save form changes
    this.ownerInfoForm.valueChanges.subscribe(values => {
      this.saveChanges();
    });
  }

  saveChanges(): void {
    if (this.ownerInfoForm.valid) {
      this.registrationService.updateOwnerInfo(this.ownerInfoForm.value);
    }
  }
}