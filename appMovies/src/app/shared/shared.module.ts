import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, NgbCollapseModule],
  exports: [CardComponent],
})
export class SharedModule {}
