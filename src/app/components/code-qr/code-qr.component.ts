import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service'; // Importa el servicio de almacenamiento


@Component({
  selector: 'app-code-qr',
  standalone: true,
  templateUrl: './code-qr.component.html',
  styleUrls: ['./code-qr.component.scss'],
  imports: [CommonModule, IonicModule, HeaderComponent]
})
export class CodeQrComponent implements OnInit {
  isSupported = false;
  isScanning = false;
  barcodes: Array<Barcode & { latitude: number; longitude: number; timestamp: Date }> = [];

  constructor(private alertController: AlertController, private router: Router,  private storageService: StorageService,
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.storageService.storageReady$.subscribe((ready) => {
      if (ready) {
        this.barcodes = this.storageService.getQrData;
      }
    });
  }

  async scan(): Promise<void> {
    if (this.isScanning) return;
    this.isScanning = true;

    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        await this.presentAlert();
        return;
      }

      // Escanear el código y obtener la ubicación en paralelo
      const [barcodes, position] = await Promise.all([
        BarcodeScanner.scan(), // Escanear el código
        Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000 }) // Obtener geolocalización, y debe demorar menos de 5 segundos
      ]);

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Añadir la geolocalización a cada código escaneado
      for (const barcode of barcodes.barcodes) {
        const enrichedBarcode = {
          ...barcode,
          latitude: lat,
          longitude: lon,
          timestamp: new Date()
        };
        this.barcodes.push(enrichedBarcode);
        await this.storageService.saveQr(enrichedBarcode); // Guardar en local storage
        console.log('Escaneado:', enrichedBarcode);
      }

    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      this.isScanning = false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, concede permiso a la cámara para usar el escáner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  //función para abrir el mapa con la ubicación del QR escaneado
  openMap(barcode: Barcode & { latitude: number; longitude: number; timestamp: Date }) { // Se define la función openMap para abrir el mapa con la ubicación del QR escaneado
    this.router.navigate(['/map'], { // Se redirige a la ruta del mapa
      state: {  // Se envían las coordenadas del QR escaneado por la propiedad state, si se refresca la app mientras estas en el mapa se perderan los datos porque state no sobrebive al refresh
        latitude: barcode.latitude,
        longitude: barcode.longitude
      }
    });
  }
  async removeQr(barcode: any) { //funcion asincrona, recibe el array que representa el qr ya guardado
    // Elimina visualmente
    this.barcodes = this.barcodes.filter(item => //recorre los items y los pone de nuevo solo si el item no es igual al barcode que se quiere eliminar
      !(item.rawValue === barcode.rawValue && item.timestamp === barcode.timestamp)
    );
  
    // Actualiza también el almacenamiento
    const updatedList = this.storageService.getQrData.filter(item => //hace lo mismo que el anterior pero con el local storage
      !(item.rawValue === barcode.rawValue && item.timestamp === barcode.timestamp)
    );
    await this.storageService.setQrData(updatedList);
  }
  
  
}
