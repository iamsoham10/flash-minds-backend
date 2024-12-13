import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import { GetCardService } from '../../services/get-card.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  animations: [
    trigger('floatUp', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {
    this.readCards();
  }
  cardList: any[] = [];
  constructor(private getCardService: GetCardService, private http: HttpClient) { }
  isMenuOpened: boolean = false;
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  readCards() {
    this.getCardService.exploreCards().subscribe({
      next: (data) => {
        this.cardList = data.cards;
        console.log("Cards fetched successfully: ", data);
      },
      error: (error) => {
        console.error('Error fetching cards: ', error);
      }
    })
  }
}
