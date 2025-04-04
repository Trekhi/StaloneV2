import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonInfiniteScroll, IonRow, IonCol, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import data from '../../assets/rick-morty.json';
import { ModalController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RickMoryService } from '../services/rick-mory.service';
import { ModalComponent } from '../components/modal/modal.component';
import { HeaderComponent } from '../components/header/header.component';
import { CardComponent } from '../components/card/card.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonCol, IonRow, IonInfiniteScroll, IonGrid, IonHeader, IonToolbar, IonContent, CommonModule, HeaderComponent, CardComponent],
})
export class Tab3Page {

  jsonData: any = data;
  personajes: any[] = [];
  url_next: string = '';

  episodes: any[] = [];
  currentPage = 1;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private rickMortyService: RickMoryService) {}

    //Una vez que cargue el tab3 este metodo se cargara y se actualizara
  ngOnInit() {
    this.loadEpisodes();
    //this.cargarPersonajes();
  }

  //El metodo que va a cargar los personajes
  async cargarPersonajes() {
    //this.cargando = true;
    await this.rickMortyService
      .getEpisodios()
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignacion de los personajes de la respuesta
        this.personajes = resp.results;
        
        //console.log("MISPERSONAJES", this.personajes);

        this.url_next = resp.info.next;
        //console.log("SIGUIENTE", this.url_next);

      });
  }

  ///////////////////////////////////////////////////////////////////NUEVO CODIGO
  loadEpisodes(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;
  
    this.rickMortyService.getEpisodes(this.currentPage).subscribe({
      next: (data) => {
        //console.log("Respuesta de la API:", data);
  
        //FUNCIÓN PARA CONCATENAR 
        const episodesWithImages = data.results.map((episode: any) => {
          const match = this.jsonData.episodes.find((img: any) => 
            img.title === episode.name || 
            `S${img.season.toString().padStart(2, '0')}E${img.episode.toString().padStart(2, '0')}` === episode.episode
          );
  
          return {
            ...episode,
            image_url: match ? match.image_url : 'assets/default-image.jpg' // Imagen por defecto si no hay coincidencia
          };
        });
  
        //ALMACENAMIENTO DE LA INFORMACIÓN OBTENIDA 
        this.episodes = [...this.episodes, ...episodesWithImages];
        console.log(this.episodes)
        this.currentPage++; 
        this.isLoading = false;
  
        if (event) event.target.complete(); 
      },
      error: (err) => {
        console.error('Error al cargar episodios:', err);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
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
