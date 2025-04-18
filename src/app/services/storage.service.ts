import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null; //Si no hay nada permace en null y en caso de que si se almacena lainformación de la cache.
  private _localPersonajes: any[] = [];
  private _storageReady = new BehaviorSubject<boolean>(false); //El BehaviorSubject es un tipo especial de Subject que requiere un valor inicial y siempre devuelve el último valor a los nuevos suscriptores. En este caso, se inicializa con false.
  private _qrData: any[] = [];  //Arreglo para almacenar los datos del QR escaneado.


  constructor(private storage: Storage) {
    this.init(); //INICIO LA CARGA DE INFORMACIÓN EN EL STORAGE.
  }

  async init() {
    this._storage = await this.storage.create(); // la información ya guarada dentro del storage con el cache
    await this.loadFavorites();
    await this.loadQrData();
    this._storageReady.next(true);

  }

  get storageReady$(): Observable<boolean> {
    return this._storageReady.asObservable();
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


  async loadQrData() { //Carga los datos del QR escaneado desde el almacenamiento local.
    if (!this._storage) return;
    const data = await this._storage.get('qrData'); // recupero los datos guardados en el local storage con la llave qrData.
    this._qrData = data || []; // Si no hay datos, inicializa como un arreglo vacío
    console.log('QRs cargados:', this._qrData);
  }
  
  async saveQr(barcode: any) {
    if (!this._storage) return;
    this._qrData.unshift(barcode); // con unshift añado el nuevo QR al inicio del array, si no lo hago se añade al final y no se ve en la lista de escaneados.
    await this._storage.set('qrData', this._qrData); // actualiza el almacenamiento con la nueva lista de QRs.
  }
  
  get getQrData(): any[] {
    return [...this._qrData];
  }
  
  async clearQrData() {
    this._qrData = [];
    await this._storage?.remove('qrData');
  }

  async setQrData(data: any[]) {
    this._qrData = data;
    await this._storage?.set('qrData', this._qrData);
  }
  
}
