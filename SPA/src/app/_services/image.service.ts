import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class imageService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {

  }

  uploadImage(userId, image) {
    const imageData = new FormData();
    imageData.append('file', image, image.name)
    return this.http.post('http://localhost:5000/api/upload/profile-image/' + userId, imageData, { reportProgress: true, observe: 'events' })
  }

}
