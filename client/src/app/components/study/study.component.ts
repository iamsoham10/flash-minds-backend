import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GetCardService } from '../../services/get-card.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
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
  quizTestForm!: FormGroup;
  flip: string = 'front';

  constructor(private getCardService: GetCardService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.quizTestForm = this.fb.group({
      answers: this.fb.array(
        this.filteredCardList.map(() => this.fb.control('', Validators.required))
      )
    });
  }

  ngOnInit(): void {
    this.getAllCards();
  }
  get answers(): FormArray {
    return this.quizTestForm.get('answers') as FormArray<FormControl>;
  }
  initializeForm() {
    this.quizTestForm = this.fb.group({
      answers: this.fb.array(
        this.filteredCardList.map(() => this.fb.control('', Validators.required))
      )
    })
  }

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
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('jwttoken');
      this.router.navigate(['/auth']);
    }
    const user_id = decodedToken.user_id;
    this.getCardService.getCards(user_id).subscribe({
      next: (data) => {
        this.cardList = data.cards;
        this.subject = this.route.snapshot.paramMap.get('subject') || '';
        this.filteredCardList = this.cardList.filter(card => card.subject === this.subject);
        console.log('Filtered cards: ', this.filteredCardList);
        this.initializeForm();
      },
      error: (err) => {
        console.log('error fetching', err);
      }
    })
  }

  // testForm = new FormGroup({
  //   answer: new FormControl('', Validators.required),
  // });

  showTestDiv = false;
  showTestResultDiv = false;
  showCardDiv = true;
  totalTestQuestions = this.filteredCardList.length;
  correctTestAnswers = 0;
  incorrectTestAnswers = 0;
  testPercentage = 0;

  testResult() {
    if (this.quizTestForm.valid) {
      const submittedAnswers = this.quizTestForm.value.answers;
      this.filteredCardList.forEach((card, index) => {
        if (submittedAnswers[index].trim().toLowerCase() === card.definition.trim().toLowerCase()) {
          this.correctTestAnswers++;
        } else {
          this.incorrectTestAnswers++;
        }
      });
      this.totalTestQuestions = this.filteredCardList.length;
      this.testPercentage = parseFloat(((this.correctTestAnswers / this.totalTestQuestions) * 100).toFixed(2));
      this.showTestResultDiv = true;
    } else {
      console.log('Please answer all questions');
    }
  }

  showTest() {
    this.showTestDiv = true;
    this.showCardDiv = false;
  }
}
