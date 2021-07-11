import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/_models/Incident';

@Component({
  selector: 'app-incidentPlaceholder',
  templateUrl: './incidentPlaceholder.component.html',
  styleUrls: ['./incidentPlaceholder.component.css']
})
export class IncidentPlaceholderComponent implements OnInit {
  incident: Incident;

  constructor() { }

  ngOnInit() {
    this.incident = new Incident();
    this.incident.id = 1;
    this.incident.cause = "work not done in time"
  }

}
