import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-online-presence',
  templateUrl: './online-presence.component.html',
  styleUrls: ['./online-presence.component.scss']
})
export class OnlinePresenceComponent implements OnInit {
  onlinePresenceForm!: FormGroup;
  websiteIconPreview: string | ArrayBuffer | null = null;
  
  socialPlatforms = [
    'Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube', 'TikTok', 'Other'
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
    
    this.onlinePresenceForm = this.fb.group({
      websiteLink: this.fb.group({
        url: [data.websiteLink?.url || '', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        name: [data.websiteLink?.name || ''],
        description: [data.websiteLink?.description || ''],
        iconData: this.fb.group({
          fileName: [data.websiteLink?.iconData?.fileName || ''],
          url: [data.websiteLink?.iconData?.url || ''],
          contentType: [data.websiteLink?.iconData?.contentType || ''],
          description: [data.websiteLink?.iconData?.description || '']
        })
      }),
      socialMediaLinks: this.fb.array([])
    });

    // Load existing social media links or create a default empty one
    if (data.socialMediaLinks && data.socialMediaLinks.length > 0) {
      data.socialMediaLinks.forEach(socialLink => {
        this.addSocialMediaLink(socialLink.socialPlatformName, socialLink.url);
      });
    } else {
      this.addSocialMediaLink();
    }

    // Auto-save form changes
    this.onlinePresenceForm.valueChanges.subscribe(() => {
      this.saveChanges();
    });
  }

  get socialMediaLinks(): FormArray {
    return this.onlinePresenceForm.get('socialMediaLinks') as FormArray;
  }

  addSocialMediaLink(platform: string = '', url: string = ''): void {
    const socialMediaLinkForm = this.fb.group({
      socialPlatformName: [platform, Validators.required],
      url: [url, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    });

    this.socialMediaLinks.push(socialMediaLinkForm);
  }

  removeSocialMediaLink(index: number): void {
    this.socialMediaLinks.removeAt(index);
    this.saveChanges();
  }

  onWebsiteIconSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length) {
      const file = element.files[0];
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.websiteIconPreview = reader.result;
        
        // Update the form
        const iconDataForm = this.onlinePresenceForm.get('websiteLink.iconData');
        if (iconDataForm) {
          iconDataForm.patchValue({
            fileName: file.name,
            contentType: file.type,
            url: `/images/website` // This would be set by the server
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    if (this.onlinePresenceForm.valid) {
      this.registrationService.updateWebsiteLink(
        this.onlinePresenceForm.value.websiteLink
      );
      
      this.registrationService.updateSocialMediaLinks(
        this.onlinePresenceForm.value.socialMediaLinks
      );
    }
  }
}