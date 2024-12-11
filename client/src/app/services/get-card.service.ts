import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCardService {

  constructor(private http: HttpClient) { }

  // getCards(): Observable<any> {
  //   return this.http.get(this.getCardsAPI);
  // }
}
