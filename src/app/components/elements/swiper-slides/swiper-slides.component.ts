import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle'; //Metodo de migración de componentes para versiones 11+ de Swiper
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';

// Registra los componentes de Swiper
register();
@Component({
  selector: 'app-swiper-slides',
  templateUrl: './swiper-slides.component.html',
  styleUrls: ['./swiper-slides.component.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperSlidesComponent {

  @Input() titulo!: string;
  @Input() personajes: any[] | null = null;

  breakpoints = {
    320: { slidesPerView: 1 }, // 1 tarjeta en móviles pequeños
    480: { slidesPerView: 2 }, // 2 tarjetas en móviles medianos
    768: { slidesPerView: 3 }, // 3 tarjetas en tablets
    1024: { slidesPerView: 5 }, // 5 tarjetas en escritorio
    1280: { slidesPerView: 6 } // 6 tarjetas en pantallas grandes
  };

  ///ESTO YA NO FUNCIONA AL PARACER TU LO CONFIGURAS DENTRO DEL APARTADO DEL HTML 
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
      320: { slidesPerView: 1 }, // 1 tarjeta en móviles pequeños
      480: { slidesPerView: 2 }, // 2 tarjetas en móviles medianos
      768: { slidesPerView: 3 }, // 3 tarjetas en tablets
      1024: { slidesPerView: 5 } // 5 tarjetas en escritorio
    }
  };
  
}
