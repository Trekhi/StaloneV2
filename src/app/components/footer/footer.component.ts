import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports:[CommonModule,IonicModule]
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
