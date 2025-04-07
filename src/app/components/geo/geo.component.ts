import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GeoComponent implements OnInit, AfterViewInit {
  lat: number | null = null;
  lon: number | null = null;
  loading = false;
  private map: L.Map | undefined;

  constructor() {}

  ngOnInit() {}

  async ngAfterViewInit() {
    await this.getCurrentLocation(); // después del render
  }

  async getCurrentLocation() {
    try {
      this.loading = true;

      const coordinates = await Geolocation.getCurrentPosition();

      this.lat = coordinates.coords.latitude;
      this.lon = coordinates.coords.longitude;

      console.log('Ubicación:', this.lat, this.lon);
      this.initMap(); // solo después de tener lat/lon
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
    } finally {
      this.loading = false;
    }
  }

  initMap() {
    if (!this.lat || !this.lon) return;
  
    // Esperar al siguiente ciclo del DOM
    setTimeout(() => {
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container still not found.');
        return;
      }
  
      if (this.map) {
        this.map.remove();
      }
  
      this.map = L.map('map').setView([this.lat!, this.lon!], 15);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      L.marker([this.lat!, this.lon!]).addTo(this.map)
        .bindPopup('Estás aquí 📍')
        .openPopup();
    }, 100); // tiempo pequeño para asegurarse que el div esté renderizado
  }
}  
