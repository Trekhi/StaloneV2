import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonicModule],
})
export class CardComponent  implements OnInit {

  isBought = false;
  isExpanded = false;

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() description!: string;
  @Input() image!: string;

  constructor() { }

  ngOnInit() {}

  openModal() {
    console.log(`Abriendo modal para: ${this.title}`);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  
  togglePurchase() {
    this.isBought = !this.isBought;
  }
  stopEvent(event: Event) {
    event.stopPropagation();
  }

}
