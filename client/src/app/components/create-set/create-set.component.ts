import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCardService } from '../../services/add-card.service';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css'
})
export class CreateSetComponent {
  constructor(private addSetService: AddCardService) { }
  private formBuilder = inject(FormBuilder);

  createSetForm = this.formBuilder.group({
    subject: ['', [Validators.required]],
    term: ['', [Validators.required]],
    definition: ['', [Validators.required]]
  });
  isLoadingSet = false;
  saveSet() {
    if (this.createSetForm.valid) {
      this.isLoadingSet = true;
      this.addSetService.addSet(this.createSetForm.value).subscribe(
        (response) => {
          console.log("set created");
          this.isLoadingSet = false;
        },
        (error) => {
          console.error("error saving set:", error);
          this.isLoadingSet = false;
        }
      )
    }
  }
}
