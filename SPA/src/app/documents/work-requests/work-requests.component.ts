import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WorkRequestService } from 'src/app/_services/workRequest.service';

@Component({
  selector: 'app-work-requests',
  templateUrl: './work-requests.component.html',
  styleUrls: ['./work-requests.component.css']
})
export class WorkRequestsComponent implements OnInit {
  workRequests = [];

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  displayedColumns: string[] = ['id', 'start_date', 'phone_num', 'status', 'address'];

  constructor(private workRequestService: WorkRequestService, private router: Router) { }

  ngOnInit(): void {
    this.loadWorkRequests();
  }

  loadWorkRequests() {
    this.workRequestService.fetchWorkRequests(this.page, this.limit).subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.workRequests = responseJSON;
      this.loading = false;
    });
  }

  showWorkRequestForm() {

  }

  goToPage(n: number) {
    console.log('Going to Specific Page!');
    this.page = n;
    this.loadWorkRequests();
  }

  goToPrevious() {
    console.log('Previous Button Clicked!');
    this.page--;
    this.loadWorkRequests();
  }

  goToNext() {
    console.log('Next Button Clicked!');
    this.page++;
    this.loadWorkRequests();
  }

  reloadTable(n) {
    this.limit = n;
    this.loadWorkRequests();
  }

  redirectToAddWorkRequestPage() {
    this.router.navigate(['create-work-request']);
  }
}