import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-newWorkRequest',
  templateUrl: './newWorkRequest.component.html',
  styleUrls: ['./newWorkRequest.component.css']
})
export class NewWorkRequestComponent implements OnInit {

  newWorkReqFrom: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.newWorkReqFrom = formBuilder.group({
      purpose: [null],
      additionalInfo: [null],
      startDate: [null],
      endDate: [null],
      userId: [null],
      phoneNumber: [null],
      address: this.formBuilder.group({
        street: [null],
        number: [null],
        city: [null],
        country: [null],
        longitude: [null],
        latitude: [null]
      })
    });
  }

  ngOnInit() {
    this.newWorkReqFrom.controls['userId'].setValue(this.authService.getId());
  }

  submit() {
    console.log(this.newWorkReqFrom.value);
    
  }

  logEvent(event) {
    console.log(event);
    
  }

  handleMapSelection(event) {
    const road = event.address.road;
    const houseNumber = event.address.house_number;
    let city: string;
    if (event.address.city) {
      city = event.address.city;
    } else if (event.address.village) {
      city = event.address.village;
    }
    const country = event.address.country;

    this.newWorkReqFrom.controls['address'].setValue({street: road, number: houseNumber ?? 0, city: city,
     country: country, longitude: event.lon, latitude: event.lat});

    this.newWorkReqFrom.markAsDirty();
  }


}
