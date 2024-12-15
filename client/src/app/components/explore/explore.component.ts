import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GetCardService } from '../../services/get-card.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  ngOnInit(): void {
    this.getAllCards();
  }
  constructor(private getCardService: GetCardService, private http: HttpClient) { }
  cardList: any[] = [];
  getAllCards() {
    const token = localStorage.getItem('jwttoken');
    const decodedToken: any = token?.toString() && jwtDecode(token);
    const user_id = decodedToken.user_id;
    this.getCardService.getCards(user_id).subscribe({
      next: (data) => {
        this.cardList = data.cards;
        console.log('cards fetched successfully', this.cardList);
      },
      error: (err) => {
        console.log('error fetching', err);
      }
    })
  }
}
