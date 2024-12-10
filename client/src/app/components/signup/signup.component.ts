import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [
    trigger('floatUpAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('1s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ])
    ])
  ]
})
export class SignupComponent {
  isSignUp: boolean = true;

  toggleForm() {
    this.isSignUp = !this.isSignUp
  }

  userSignUpForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),

  })
}
