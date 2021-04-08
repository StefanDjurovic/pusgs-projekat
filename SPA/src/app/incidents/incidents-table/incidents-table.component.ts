import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidents-table',
  templateUrl: './incidents-table.component.html',
  styleUrls: ['./incidents-table.component.css']
})
export class IncidentsTableComponent implements OnInit {
  callsTableVisability = false;
  callFormVisability = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCallsPress() {
    this.callsTableVisability = true;
  }

  showCallForm(e) {
    this.hideAllComponents();
    this.callFormVisability = true;
  }

  hideCallForm(e) {
    console.log('hise call form');
    this.hideAllComponents();
    this.callsTableVisability = true;
  }

  hideAllComponents() {
    this.callsTableVisability = false;
    this.callFormVisability = false;
  }
}
