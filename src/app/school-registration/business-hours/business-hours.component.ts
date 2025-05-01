import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { BusinessHours } from '../../models/school-registration.model';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {
  businessHoursForm!: FormGroup;
  
  weekdays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
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
    
    this.businessHoursForm = this.fb.group({
      businessHours: this.fb.array([])
    });

    // Load existing business hours or create default
    if (data.bussinessHours && data.bussinessHours.length > 0) {
      data.bussinessHours.forEach(hours => {
        this.addBusinessHours(hours);
      });
    } else {
      // Add default business hours (Mon-Fri, 9am-5pm)
      this.addBusinessHours({
        daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        intervals: [{ startingHourAndMinute: '09:00', endingHourAndMinute: '17:00' }]
      });
    }

    // Auto-save form changes
    this.businessHoursForm.valueChanges.subscribe(() => {
      this.saveChanges();
    });
  }

  get businessHours(): FormArray {
    return this.businessHoursForm.get('businessHours') as FormArray;
  }

  intervals(scheduleIndex: number): FormArray {
    return this.businessHours.at(scheduleIndex).get('intervals') as FormArray;
  }

  addBusinessHours(hours?: BusinessHours): void {
    const businessHoursGroup = this.fb.group({
      daysOfTheWeek: [hours?.daysOfTheWeek || [], [Validators.required, Validators.minLength(1)]],
      intervals: this.fb.array([])
    });

    this.businessHours.push(businessHoursGroup);

    // Add intervals
    if (hours?.intervals && hours.intervals.length > 0) {
      hours.intervals.forEach(interval => {
        this.addInterval(
          this.businessHours.length - 1,
          interval.startingHourAndMinute,
          interval.endingHourAndMinute
        );
      });
    } else {
      this.addInterval(this.businessHours.length - 1, '09:00', '17:00');
    }
  }

  addInterval(scheduleIndex: number, startTime: string = '', endTime: string = ''): void {
    const intervalGroup = this.fb.group({
      startingHourAndMinute: [startTime, Validators.required],
      endingHourAndMinute: [endTime, [Validators.required, this.endTimeValidator]]
    });

    this.intervals(scheduleIndex).push(intervalGroup);
  }

  removeBusinessHours(index: number): void {
    this.businessHours.removeAt(index);
    this.saveChanges();
  }

  removeInterval(scheduleIndex: number, intervalIndex: number): void {
    const intervals = this.intervals(scheduleIndex);
    if (intervals.length > 1) {
      intervals.removeAt(intervalIndex);
      this.saveChanges();
    }
  }

  // Custom validator to ensure end time is after start time
  endTimeValidator(control: any): {[key: string]: any} | null {
    const group = control.parent;
    if (!group) {
      return null;
    }
    
    const startTime = group.get('startingHourAndMinute')?.value;
    const endTime = control.value;
    
    if (!startTime || !endTime) {
      return null;
    }
    
    if (endTime <= startTime) {
      return { 'endTimeBeforeStartTime': true };
    }
    
    return null;
  }

  saveChanges(): void {
    if (this.businessHoursForm.valid) {
      // Rename to match backend property name
      this.registrationService.updateBusinessHours(
        this.businessHoursForm.value.businessHours
      );
    }
  }
}