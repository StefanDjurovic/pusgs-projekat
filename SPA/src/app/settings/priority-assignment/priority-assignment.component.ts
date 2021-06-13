import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';

export interface PriorityElement {
  id: number;
  street: number;
  city: string
  priority: number;
}

@Component({
  selector: 'app-priority-assignment',
  templateUrl: './priority-assignment.component.html',
  styleUrls: ['./priority-assignment.component.css']
})
export class PriorityAssignmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'street', 'city', 'priority', 'update'];
  dataSource = [];

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.fetchPriorities();
  }

  updateStreetPriority() {
    var url = 'http://localhost:5000/api/AddressPriority/update';
    this.http.post(url, this.dataSource).subscribe(res => {
      this.alertify.success('Successfully Updated Priority!');
    }, error => {
      this.alertify.error(error);
    });
  }

  fetchPriorities() {
    var url = 'http://localhost:5000/api/AddressPriority/';
    this.http.get<PriorityElement>(url).subscribe(res => {
      this.dataSource = JSON.parse(JSON.stringify(res));
    });
  }
}
