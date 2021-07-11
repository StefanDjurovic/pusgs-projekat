import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UnitService } from 'src/app/_services/unit.service';
import { Location } from '@angular/common';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { Unit } from '../_models/Unit';

@Component({
  selector: 'app-unitsForm',
  templateUrl: './unitsForm.component.html',
  styleUrls: ['./unitsForm.component.css']
})
export class UnitsFormComponent implements OnInit {

  availableUsers: User[];
  checkedUsers: User[] = [];

  constructor(private unitService: UnitService, private location: Location, private userService: UserService) { }

  unitsForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit() {
    this.userService.getAvailableUMs().subscribe(data => {
      this.availableUsers = data;      
      // console.log(this.users);
      
    }, error => {
      console.log(error);
      
    });
  }

  onCheckBoxClick(event) {
    console.log(event);
    
  }

  onCheckboxChange(event) {
    if (event.checked) {
      this.checkedUsers.push(event.source.id);
    } else {
      this.checkedUsers = this.checkedUsers.filter(userId => userId != event.source.id)
    }
    
  }

  onSubmit() {
    // log check list
    // console.log(this.checkedUsers);

    

    if (this.unitsForm.valid) {
      this.unitService.createUnit(this.unitsForm.value).subscribe(unitId => {
        
        this.checkedUsers.forEach(userId => this.unitService.addUnitMember(unitId, userId).subscribe(() => {}, error => { console.log(error);}));

        this.location.back();     
      }, error => {
        console.log(error);
        
      });
    }
  }

}
