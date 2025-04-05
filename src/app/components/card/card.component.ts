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
  
  @Input() image!: string;

  @Input() set subtitle(value: string) {
    this._formattedSubtitle = this.formatSubtitle(value);
  }

  get subtitle(): string {
    return this._formattedSubtitle;
  }
  private _formattedSubtitle = '';

  private formatSubtitle(raw: string): string {
    if (!raw) return '';
    
    // Formato 1: "December2,2013S01E01" → "December 2, 2013 • S01E01"
    const formatted = raw
      .replace(/([a-z])(\d)/i, '$1 $2')       // Añade espacio entre mes y día
      .replace(/(,\s*)(\d{4})/, '$1$2 • ')    // Añade espacio antes del código de episodio
      .replace(/(S\d+E\d+)/, '• $1');         // Añade bullet point si no existe

    return formatted;
  }

  // Opcional: Formatear descripción si también viene sin espacios
  @Input() set description(value: string) {
    this._formattedDescription = this.formatDescription(value);
  }
  get description(): string {
    return this._formattedDescription;
  }
  private _formattedDescription = '';

  private formatDescription(raw: string): string {
    return raw?.replace(/([.!?])([A-Z])/g, '$1 $2') || '';
  }



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
