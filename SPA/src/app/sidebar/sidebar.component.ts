import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, auth: AuthService) {
    this.router = router;
  }

  ngOnInit(): void {

  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }
}
