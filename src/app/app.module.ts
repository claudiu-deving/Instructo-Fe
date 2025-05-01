import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// Material Modules
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar'

// Components
import { AppComponent } from './app.component';
import { SchoolRegistrationComponent } from './school-registration/school-registration.component';
import { BasicInfoComponent } from './school-registration/basic-info/basic-info.component';
import { OwnerInfoComponent } from './school-registration/owner-info/owner-info.component';
import { ContactInfoComponent } from './school-registration/contact-info/contact-info.component';
import { OnlinePresenceComponent } from './school-registration/online-presence/online-presence.component';
import { BusinessHoursComponent } from './school-registration/business-hours/business-hours.component';
import { ServicesComponent } from './school-registration/services/services.component';
import { ReviewComponent } from './school-registration/review/review.component';

// Services
import { RegistrationService } from './services/registration.service';
import { routes } from './app.config';



@NgModule({
  declarations: [
    AppComponent,
    SchoolRegistrationComponent,
    BasicInfoComponent,
    OwnerInfoComponent,
    ContactInfoComponent,
    OnlinePresenceComponent,
    BusinessHoursComponent,
    ServicesComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    // Material modules
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }