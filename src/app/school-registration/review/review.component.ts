import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { SchoolRegistration } from '../../models/school-registration.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  registrationData!: SchoolRegistration;
  
  // Data for vehicle categories and certifications lookup
  vehicleCategories = {
    'A1': 'Motorcycles (Light)',
    'A2': 'Motorcycles (Medium)',
    'A': 'Motorcycles (Unrestricted)',
    'B1': 'Light Vehicles',
    'B': 'Cars',
    'C1': 'Medium-sized Vehicles',
    'C': 'Large Goods Vehicles',
    'D1': 'Minibuses',
    'D': 'Buses',
    'BE': 'Cars with Trailers',
    'C1E': 'Medium Vehicles with Trailers',
    'CE': 'Large Vehicles with Trailers',
    'D1E': 'Minibuses with Trailers',
    'DE': 'Buses with Trailers'
  };
  
  certifications = {
    'FreightTransport': 'Freight Transport',
    'PassengerTransport': 'Passenger Transport',
    'DangerousGoods': 'Dangerous Goods Transport',
    'DefensiveDriving': 'Defensive Driving',
    'FirstAid': 'First Aid for Drivers',
    'AdvancedDriving': 'Advanced Driving Techniques',
    'EcoDriving': 'Eco-Driving'
  };

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationData = this.registrationService.registrationData;
  }
  
  getCategoryName(code: string): string {
    return this.vehicleCategories[code as keyof typeof this.vehicleCategories] || code;
  }
  
  getCertificationName(code: string): string {
    return this.certifications[code as keyof typeof this.certifications] || code;
  }
  
  formatBusinessHoursDays(days: string[]): string {
    if (!days || days.length === 0) {
      return 'None';
    }
    
    if (days.length === 7) {
      return 'All Days';
    }
    
    // Sort days in week order
    const weekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const sortedDays = [...days].sort((a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b));
    
    // Try to create ranges
    const ranges = [];
    let rangeStart = sortedDays[0];
    let rangeEnd = rangeStart;
    
    for (let i = 1; i < sortedDays.length; i++) {
      const currentDay = sortedDays[i];
      const currentDayIndex = weekOrder.indexOf(currentDay);
      const prevDayIndex = weekOrder.indexOf(rangeEnd);
      
      if (currentDayIndex - prevDayIndex === 1) {
        // Consecutive day, extend the range
        rangeEnd = currentDay;
      } else {
        // Non-consecutive, close the range and start a new one
        ranges.push(rangeStart === rangeEnd ? rangeStart : `${rangeStart} - ${rangeEnd}`);
        rangeStart = currentDay;
        rangeEnd = currentDay;
      }
    }
    
    // Add the last range
    ranges.push(rangeStart === rangeEnd ? rangeStart : `${rangeStart} - ${rangeEnd}`);
    
    return ranges.join(', ');
  }
  
  formatTimeInterval(interval: {startingHourAndMinute: string, endingHourAndMinute: string}): string {
    if (!interval) {
      return '';
    }
    
    return `${interval.startingHourAndMinute} - ${interval.endingHourAndMinute}`;
  }
}