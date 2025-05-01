import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  basicInfoForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const data = this.registrationService.registrationData;
    
    this.basicInfoForm = this.fb.group({
      name: [data.name, [Validators.required]],
      legalName: [data.legalName, [Validators.required]],
      schoolEmail: [data.schoolEmail, [Validators.required, Validators.email]],
      city: [data.city, [Validators.required]],
      address: [data.address, [Validators.required]],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    // Auto-save form changes
    this.basicInfoForm.valueChanges.subscribe(values => {
      console.log(  this.basicInfoForm)
      this.saveChanges();
    });
  }

  saveChanges(): void {
    if (this.basicInfoForm.valid) {
      this.registrationService.updateBasicInfo(this.basicInfoForm.value);
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length) {
      const file = element.files[0];
      this.selectedFile = file;
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        
        // Update the registration data with image info
        this.registrationService.updateBasicInfo({
          imagePath: file.name,
          imageContentType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  }
}