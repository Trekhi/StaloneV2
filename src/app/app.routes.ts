import { Routes } from '@angular/router';
import { CodeQrComponent } from './components/code-qr/code-qr.component';
import { GeoComponent } from './components/geo/geo.component';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  { path: 'qr', component: CodeQrComponent },
  { path: 'map', component: GeoComponent },  //se define ruta map para geo que contiene el mapa


];
