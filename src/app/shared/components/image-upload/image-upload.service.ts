// import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {



  constructor(private http: HttpClient) {}


  public uploadImage(image: File): any { // Observable<Response>
    const formData = new FormData();

    formData.append('image', image);

    console.log(image);

    return this.http.post('/api/v1/image-upload', formData);
  }
}
