import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports:[CommonModule,IonicModule]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
