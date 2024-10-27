import { Component, Input } from '@angular/core';
import { iFavorite } from '../../interfaces/i-favorite';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() favorite!: iFavorite;

  isCollapsed: boolean = true;
}
