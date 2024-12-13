import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCardService {
  getCardsAPI = "http://localhost:3000/api/cards/readcard";
  constructor(private http: HttpClient) { }

  getCards(user_id: string): Observable<any> {
    const params = new HttpParams().set('user_id', user_id);
    return this.http.get(this.getCardsAPI, { params });
  }

  exploreCardsAPI = "http://localhost:3000/api/cards/readcard?user_id=320dbb16-ca93-47e2-8388-734db51fa750";
  exploreCards(): Observable<any> {
    return this.http.get(this.exploreCardsAPI);
  }
}
