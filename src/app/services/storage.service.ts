import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null; //Si no hay nada permace en null y en caso de que si se almacena lainformación de la cache.
  private _localPersonajes: any[] = [];

  constructor(private storage: Storage) {
    this.init(); //INICIO LA CARGA DE INFORMACIÓN EN EL STORAGE.
  }

  async init() {
    this._storage = await this.storage.create(); // la información ya guarada dentro del storage con el cache
    await this.loadFavorites();
  }

  get getLocalPersonajes() {
    return [...this._localPersonajes]; //Obtengo toda la información del sistema y seguidamente la obtengo en un arreglo
  }

  async loadFavorites() {
    try {
      if (!this._storage) {
        console.error('Error: Storage no inicializado');
        return;
      }
      const personajes = await this._storage.get('personajes'); //Accedo a la llave de personajes 
      this._localPersonajes = personajes || []; //Creo un arreglo o la información, permace dentro de un array.
      console.log('Favoritos cargados:', this._localPersonajes);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }

  public personajeInFavorites(personaje: any): boolean {//Valido el personaje si tiene el campo de favoritos mediante una condición de id, ya que se guarda el favorito siendo el nombre del personaje, CREO
    return !!this._localPersonajes.find(localPersonaje => localPersonaje.id === personaje.id);

  }

  async saveRemovePersonaje(personaje: any) { //ELIMINO LA INFORMAICÓN Y CONFIRMO EN TIEMPO REAL. EL FAVORITO DEL USUARIO.
    if (!this._storage) {
      console.error('Error: Storage no inicializado');
      return;
    }
    const exists = this._localPersonajes.find(localPersonaje => localPersonaje.id === personaje.id);

    if (exists) {
      this._localPersonajes = this._localPersonajes.filter(localPersonaje => localPersonaje.id !== personaje.id);
    } else {
      this._localPersonajes = [personaje, ...this._localPersonajes];
    }

    await this._storage.set('personajes', this._localPersonajes);
  }
}
