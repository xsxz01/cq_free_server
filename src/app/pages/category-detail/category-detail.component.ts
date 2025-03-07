import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {
  constructor(public router: Router) {}

  goBack() {
    history.back();
  }

  close() {
    this.router.navigate(['/benefit-mall']);
  }
}
