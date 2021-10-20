import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http'; // Comunicación F Y B

@Injectable({providedIn: 'root'})

export class ProfileService {

    readonly URL_API = "http://localhost:3000/profile"; // Url de nuestra API REST

    constructor(private http: HttpClient, private handler: HttpBackend) { // Nos ayuda a comunicar back con front
      this.http = new HttpClient(handler)
    }

    getProfile(token:string) //
    {
      const headersOpt = new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`
      )

      return this.http.get(this.URL_API,{headers: headersOpt});
    }
  }