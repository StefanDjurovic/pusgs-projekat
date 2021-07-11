import { HttpClient } from '@angular/common/http';
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
  constructor(private router: Router, public authService: AuthService, private alertify: AlertifyService, private http: HttpClient) {
    this.router = router;
  }

  token : any;
  profileImage: any;

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.token = this.authService.decodedToken;
      this.loadImage();
    }
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  logOut() {
    localStorage.removeItem('token');
    // window.location.href = '/login';
    this.alertify.message ('you have been logged out');
    this.router.navigate([''])
  }  



  loadImage() {
    // var id = this.authService.decodedToken.nameid;
    
    var imageUrl = 'http://localhost:5000/api/upload/retrieve-profile-image/' + this.token.nameid;
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profileImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
