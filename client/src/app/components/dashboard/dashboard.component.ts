import { Component, OnInit } from '@angular/core';
import { GetCardService } from '../../services/get-card.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  cardList: any[] = [];

  ngOnInit(): void {
    this.getAllCards();
  }
  constructor(private getCardsService: GetCardService, private http: HttpClient, private router: Router) { }
  getAllCards() {
    const token = localStorage.getItem('jwttoken');
    if (!token) {
      this.router.navigate(['/auth']);
    }
    const decoded: any = token?.toString() && jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('jwttoken');
      console.log('jwt token expired');
      this.router.navigate(['/auth']);
    }
    else {
      console.log('token is fresh');
    }

    // const user_id = decoded.user_id;
    // this.getCardsService.getCards(user_id).subscribe({
    //   next: (data) => {
    //     this.cardList = data.cards;
    //     console.log("Cards fetched successfully: ", data);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching cards: ', err);
    //   }
    // })
  }

  isMenuOpened: boolean = false;
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }


}
