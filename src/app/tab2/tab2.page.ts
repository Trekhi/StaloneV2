import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonAvatar, IonContent, IonHeader, IonToolbar, IonFooter } from '@ionic/angular/standalone'; // Importar componentes de Ionic
import { ModalController } from '@ionic/angular/standalone'; //EL ERROR ERA QUE DEBIA SER A COMPONENTE STANDALOR
import { RickMoryService } from '../services/rick-mory.service';
import { HeaderComponent } from '../components/header/header.component';
//import { FooterComponent } from '../components/footer/footer.component';
import { ModalComponent } from '../components/modal/modal.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [ IonToolbar, IonHeader, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonAvatar, IonContent, HeaderComponent], // Importar componentes de Ionic
  //providers: [ModalController] // Proveer ModalController
})
export class Tab2Page implements OnInit {

  titulo: string = 'Personajes';
  subtitulo: string = 'Lista de personajes de Rick y Morty';
  personajes: any[] = [];

  constructor(
    private modalCtrl: ModalController, // Inyectar ModalController
    private rickyMortyService: RickMoryService
  ) { }

  ngOnInit() {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.rickyMortyService.getPersonajes().subscribe(
      (data: any) => {
        this.personajes = data.results; // Asigna los resultados a la propiedad personajes
        console.log('Personajes cargados:', this.personajes);
      },
    );
  }

  
  async openModal(characterUrls: string[]) {
    console.log('Opening modal with:', characterUrls);
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { characters: characterUrls },
    });
    await modal.present();
  }
    
}