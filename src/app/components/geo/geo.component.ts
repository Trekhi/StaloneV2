import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GeoComponent implements OnInit {
  lat: number | null = null;
  lon: number | null = null;
  loading = false;

  constructor() {}

  async ngOnInit() {
    await this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      this.loading = true;

      const coordinates = await Geolocation.getCurrentPosition();

      this.lat = coordinates.coords.latitude;
      this.lon = coordinates.coords.longitude;

      console.log('Ubicación:', this.lat, this.lon);
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
    } finally {
      this.loading = false;
    }
  }
}
