import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../_models/Unit';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units: Unit[] = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.units = data['units'];
      console.log(this.units);
            
    }, error => {
      console.log(error);
      console.log('we here 222');
      
      
    });
  }

  redirectToCreateNewUnit() {
    this.router.navigate(['create-unit']);
  }

}
