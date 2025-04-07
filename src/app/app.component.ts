import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.initPermissions();
  }

  async initPermissions() {
    const permission = await Geolocation.requestPermissions();

    if (permission.location !== 'granted') {
      console.warn('Ubicación no permitida por el usuario');
    }
  }
}