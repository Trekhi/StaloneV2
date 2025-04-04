import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { scan } from 'ionicons/icons';// 👈 importa esto

@Component({
  selector: 'app-code-qr',
  standalone: true,
  templateUrl: './code-qr.component.html',
  styleUrls: ['./code-qr.component.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonList, IonItem, IonInput, IonLabel, IonFab, IonFabButton, IonIcon]
})
export class CodeQrComponent  implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private storageService: StorageService,
    private alertController: AlertController
  ) {
    addIcons({ scan });
  }

  ngOnInit() {

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  
  trackByFn(index: number, item: Barcode): string {
    return item.rawValue; // O usa otro identificador único
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
