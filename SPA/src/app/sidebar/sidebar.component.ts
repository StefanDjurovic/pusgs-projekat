import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService, private alertify: AlertifyService) {
    // this.router = router;
  }

  ngOnInit(): void {

  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  logOut() {
    localStorage.removeItem('token');
    // window.location.href = '/login';
    this.alertify.message ('you have been logged out');
    this.router.navigate(['/login'])
  }  
}
