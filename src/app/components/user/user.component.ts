import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
//Importo el STORAGE para poder usar los metodos y almacenar la información del favorito
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true, // Si usas Angular Standalone Components
  imports: [CommonModule, IonicModule]
})
export class UserComponent implements OnInit {
  @Input() character: any;

  constructor(private storageService: StorageService) {
    // Registrar los iconos manualmente ya que la importación del modulo no me permite no entiendo ¿POR QUE?
    addIcons({
      'heart': heart,
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {}

  async toggleFavorito(unPersonaje: any) {
    console.log("ADDFavorite agregado");
    
    // Simular que cambia el estado con una clase animada
    const icon = document.querySelector('.favorite-icon');
    if (icon) {
      icon.classList.add('active'); 
    }
    await this.storageService.saveRemovePersonaje(unPersonaje);
  }
  

  esFavorito(unPersonaje: any): boolean {
    return this.storageService.personajeInFavorites(unPersonaje);
  }
}
