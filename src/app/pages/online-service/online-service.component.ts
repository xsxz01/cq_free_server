import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-online-service',
  imports: [NgIcon, CommonModule, FormsModule],
  templateUrl: './online-service.component.html',
  styleUrl: './online-service.component.scss'
})
export class OnlineServiceComponent {

}
