import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ConfigService {

    constructor(private http: HttpClient) {}

    getURL(url) {
        const payload = new HttpParams().set('url', url);
        return this.http.post('http://localhost:3000/urls',payload);
    }
}


