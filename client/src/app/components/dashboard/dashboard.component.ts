import { Component, OnInit } from '@angular/core';
import { GetCardService } from '../../services/get-card.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  cardList: any[] = [];

  ngOnInit(): void {
    this.getAllCards();
  }
  constructor(private getCards: GetCardService, private http: HttpClient) { }
  getCardsAPI = "http://localhost:3000/api/cards/readcard?user_id=320dbb16-ca93-47e2-8388-734db51fa750";
  getAllCards() {
    this.http.get(this.getCardsAPI).subscribe(
      (response: any) => {
        this.cardList = response.cards;
      },
      (error) => {
        console.log('error in component', error);
      }
    )
  }
}
