import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
  imports:[CommonModule, IonicModule, HeaderComponent ]
})
export class CamaraComponent implements OnInit {
  capturedImage: string | null = null;

  constructor() {}

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source:
          Capacitor.getPlatform() === 'web'
            ? CameraSource.Photos
            : CameraSource.Camera,
      });

      this.capturedImage = image.dataUrl ?? null;
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  ngOnInit() {}
}
