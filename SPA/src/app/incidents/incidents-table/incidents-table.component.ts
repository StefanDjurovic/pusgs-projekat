import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidents-table',
  templateUrl: './incidents-table.component.html',
  styleUrls: ['./incidents-table.component.css']
})
export class IncidentsTableComponent implements OnInit {
  showCalls = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCallsPress() {
    this.showCalls = true;
  }
}
