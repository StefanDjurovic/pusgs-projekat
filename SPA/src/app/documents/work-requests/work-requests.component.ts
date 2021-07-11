import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { WorkRequestService } from 'src/app/_services/workRequest.service';

@Component({
  selector: 'app-work-requests',
  templateUrl: './work-requests.component.html',
  styleUrls: ['./work-requests.component.css']
})
export class WorkRequestsComponent implements OnInit {
  filterControl = new FormControl();
  filter?: string = 'all';

  workRequests = [];

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  slicedWorkRequests = [[]];

  sortBy = 'startDate'

  displayedColumns: string[] = ['id', 'start_date', 'phone_num', 'status', 'address'];

  constructor(private authService: AuthService, private workRequestService: WorkRequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.workRequests = data['workRequests']
      console.log(this.workRequests);
      
    })

  }

  // sliceData() {
  //   this.slicedWorkRequests = [[]];
  //   let i = 0;
  //   for (let j = 0; j < this.workRequests.length; j++) {
  //     if (j < this.limit) {
  //       this.slicedWorkRequests[i] = 
  //     }
  //   }
  // }

  showWorkRequestForm() {

  }

  goToPage(n: number) {
    console.log('Going to Specific Page!');
    this.page = n;
    // this.loadWorkRequests();
  }

  goToPrevious() {
    console.log('Previous Button Clicked!');
    this.page--;
    // this.loadWorkRequests();
  }

  goToNext() {
    console.log('Next Button Clicked!');
    this.page++;
    // this.loadWorkRequests();
  }

  reloadTable(n) {
    this.limit = n;
    // this.loadWorkRequests();
  }

  redirectToAddWorkRequestPage() {
    this.router.navigate(['create-work-request']);
  }

  get WorkRequests() {

    return this.sortWorkrequests(this.filter == 'all' ? this.workRequests : this.workRequests.filter(wr => wr.userId == this.authService.getId()), this.sortBy)
  }

  private sortWorkrequests(workRequests, sortBy) {
    return workRequests.sort((a, b) => {
      if (sortBy == 'startDate') {
        return Math.abs(new Date(a.startDate).getTime() - new Date().getTime()) - Math.abs(new Date(b.startDate).getTime() - new Date().getTime());
      }
      if (sortBy == 'id') {
        return a.id - b.id;
      }
      if (sortBy == 'endDate') {
        return Math.abs(new Date(a.endDate).getTime() - new Date().getTime()) - Math.abs(new Date(b.endDate).getTime() - new Date().getTime());

      }
      if (sortBy == 'workType') {
        // return a.addressContainer.address.localeCompare(b.addressContainer.address);
        return a.workType.localeCompare(b.workType);
      }
    });
  }

  onFilterClick() {
    console.log(this.filter);
    
  }

}