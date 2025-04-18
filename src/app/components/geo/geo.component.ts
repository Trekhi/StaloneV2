import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import * as L from 'leaflet';

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
  private map: L.Map | undefined; // Mapa de Leaflet

  constructor(private router: Router) {
    // Obtener las coordenadas del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) { // Verifica si hay un estado de navegación, osea si hay datos que se han enviado con state
      this.lat = navigation.extras.state['latitude'];
      this.lon = navigation.extras.state['longitude'];
    }
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    if (!this.lat || !this.lon) {
      console.error('No se proporcionaron coordenadas');
      return;
    }

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
        .bindPopup('Ubicación del QR 📍')
        .openPopup();
    }, 100);
  }
}