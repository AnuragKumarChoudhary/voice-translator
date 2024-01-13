import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getChatResponse(input: any): Observable<any> {
    console.log(httpOptions);

    return this.http.post("https://api.openai.com/v1/chat/completions", input, httpOptions);
  }
}
