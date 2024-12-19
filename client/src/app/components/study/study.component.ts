import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { GetCardService } from '../../services/get-card.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css',
  animations: [
    trigger('flipState', [
      state(
        'front',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
      state(
        'back',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('front => back', [animate('500ms ease-out')]),
      transition('back => front', [animate('500ms ease-in')]),
    ]),
  ],

})
export class StudyComponent implements OnInit {
  filteredCardList: any[] = [];
  currentCardIndex = 0;
  subject: string = '';
  ngOnInit(): void {
    this.getAllCards();
  }
  constructor(private getCardService: GetCardService, private route: ActivatedRoute,) { }
  flip: string = 'front';

  toggleFlip() {
    this.flip = this.flip === 'front' ? 'back' : 'front';
  }

  nextCard() {
    if (this.currentCardIndex < this.cardList.length - 1) {
      this.currentCardIndex++;
    } else if (this.currentCardIndex >= this.cardList.length - 1) {
      this.currentCardIndex = 0;
    }
  }

  previousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    } else {
      this.currentCardIndex = this.cardList.length;
    }
  }

  cardList: any[] = [];
  getAllCards() {
    const token = localStorage.getItem('jwttoken');
    const decodedToken: any = token?.toString() && jwtDecode(token);
    const user_id = decodedToken.user_id;
    this.getCardService.getCards(user_id).subscribe({
      next: (data) => {
        this.cardList = data.cards;
        this.subject = this.route.snapshot.paramMap.get('subject') || '';
        this.filteredCardList = this.cardList.filter(card => card.subject === this.subject);
        console.log('Filtered cards: ', this.filteredCardList);
      },
      error: (err) => {
        console.log('error fetching', err);
      }
    })
  }
}
