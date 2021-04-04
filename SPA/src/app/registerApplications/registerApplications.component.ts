import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-registerApplications',
  templateUrl: './registerApplications.component.html',
  styleUrls: ['./registerApplications.component.css']
})
export class RegisterApplicationsComponent implements OnInit {
  applications: User[]

  constructor(private route: ActivatedRoute, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.applications = data['applications'];
    });
  }

  approveUser(id) {
    this.userService.approveApplication(id).subscribe(next => {
      this.alertify.success('application has been approved');
      this.userService.getRegisterApplications().subscribe(data => {
        this.applications = data;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  declineUser(id) {
    this.userService.declineApplication(id).subscribe(next => {
      this.alertify.success('application has been declined');
      this.userService.getRegisterApplications().subscribe(data => {
        this.applications = data;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

}
