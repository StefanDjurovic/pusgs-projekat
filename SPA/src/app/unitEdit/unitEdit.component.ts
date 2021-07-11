import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../_models/User';
import { UnitService } from '../_services/unit.service';
import { UserService } from '../_services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../_models/Unit';

@Component({
  selector: 'app-unitEdit',
  templateUrl: './unitEdit.component.html',
  styleUrls: ['./unitEdit.component.css']
})
export class UnitEditComponent implements OnInit {

  unitMembers: User[];
  availableMembers: User[];

  checkedUsers: number[] = [];
  unit: Unit;
  membersTouched: boolean = false;

  constructor(private unitService: UnitService, private route: ActivatedRoute, private location: Location, private userService: UserService) { }

  unitsForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit() {
    this.route.data.subscribe(data => {
      // console.log(data['unit']);
      this.unit = data['unit'];
      this.unitsForm.patchValue(data['unit']);
      this.unitMembers = data['unit'].members;
      // this.checkedUsers = data['unit'].members;
      this.unit.members.forEach(member => this.checkedUsers.push(member.id))
      this.availableMembers = data['availableUMs']

      // console.log(this.unitsForm.controls['name'].touched);

    }, error => {
      console.log(error);
      
    })

    // get available members
    
  }

  onSubmit() {
    if (this.unitsForm.valid) {
      if (this.unitsForm.controls['name'].value != this.unit.name) {
        this.unitService.updateUnitName(this.unit.id, this.unitsForm.controls['name'].value).subscribe(next => {
          // succ
        }, error => {
          console.log(error);
        });
      }


      if (this.membersTouched) {
        this.unitService.updateUnitMembers(this.unit.id, this.checkedUsers).subscribe(next => {
          // succ
        }, error => {
          console.log(error);
        });
      }
    }

    // let's back here
    this.location.back();
  }

  onCheckboxChange(event) {
    if (event.checked) {
      this.checkedUsers.push(event.source.id);
    } else {
      this.checkedUsers = this.checkedUsers.filter(userId => userId != event.source.id)
    }
    
    this.membersTouched = true;
  }


  onDelete(unitId) {
    this.unitService.deleteUnit(unitId).subscribe(next => {
      // this.location.back();
      console.log('should be deleted');
      
    }, error => {
      console.log(error);
    });
  }
}
