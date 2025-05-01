import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  servicesForm!: FormGroup;
  
  // Available vehicle categories
  vehicleCategories = [
    { code: 'A1', name: 'Motorcycles (Light)' },
    { code: 'A2', name: 'Motorcycles (Medium)' },
    { code: 'A', name: 'Motorcycles (Unrestricted)' },
    { code: 'B1', name: 'Light Vehicles' },
    { code: 'B', name: 'Cars' },
    { code: 'C1', name: 'Medium-sized Vehicles' },
    { code: 'C', name: 'Large Goods Vehicles' },
    { code: 'D1', name: 'Minibuses' },
    { code: 'D', name: 'Buses' },
    { code: 'BE', name: 'Cars with Trailers' },
    { code: 'C1E', name: 'Medium Vehicles with Trailers' },
    { code: 'CE', name: 'Large Vehicles with Trailers' },
    { code: 'D1E', name: 'Minibuses with Trailers' },
    { code: 'DE', name: 'Buses with Trailers' }
  ];
  
  // Available certifications
  certifications = [
    { code: 'FreightTransport', name: 'Freight Transport' },
    { code: 'PassengerTransport', name: 'Passenger Transport' },
    { code: 'DangerousGoods', name: 'Dangerous Goods Transport' },
    { code: 'DefensiveDriving', name: 'Defensive Driving' },
    { code: 'FirstAid', name: 'First Aid for Drivers' },
    { code: 'AdvancedDriving', name: 'Advanced Driving Techniques' },
    { code: 'EcoDriving', name: 'Eco-Driving' }
  ];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const data = this.registrationService.registrationData;
    
    this.servicesForm = this.fb.group({
      vechiclesCategories: [data.vechiclesCategories || [], [Validators.required, Validators.minLength(1)]],
      arrCertifications: [data.arrCertifications || []]
    });

    // Auto-save form changes
    this.servicesForm.valueChanges.subscribe(() => {
      this.saveChanges();
    });
  }

  getCategoryName(code: string): string {
    const category = this.vehicleCategories.find(c => c.code === code);
    return category ? category.name : code;
  }

  getCertificationName(code: string): string {
    const certification = this.certifications.find(c => c.code === code);
    return certification ? certification.name : code;
  }

  saveChanges(): void {
    if (this.servicesForm.valid) {
      this.registrationService.updateServices(
        this.servicesForm.value.vechiclesCategories,
        this.servicesForm.value.arrCertifications
      );
    }
  }
}