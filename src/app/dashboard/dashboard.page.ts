import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tarea } from '../tarea';
import { FirestoreService } from '../services/firestore.service';
//import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  constructor( public authService: AuthenticationService, public db: AngularFirestore, public formBuilder: FormBuilder,private firestoreService: FirestoreService, 
    //private backgroundMode: BackgroundMode
    ) {
    this.x = "---";
    this.y = "---";
    this.tareaEditando = {} as Tarea;
   }

   tareaEditando: Tarea; 
   ngOnInit() {
    this.obtenerListaTareas();
  }
  
  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];

  obtenerListaTareas(){
    this.firestoreService.consultar("Coordenadas").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
  }
  id: any;
  x!: string; //Latitud
  y!: string; //Logitud
  user: any;
  link!: string;
   
start(){
  this.locate()
  
  this.user = JSON.parse(localStorage.getItem('user')!).email

  const censo = {
    latitud: this.x,
    logitud: this.y,
    user: this.user
  };
    this.db
      .collection('Coordenadas/' + this.user)
      .add(censo)
      .then(() => {
        window.alert('Ruta Inciada!');
      });
}

stop(){
  navigator.geolocation.clearWatch(this.id)
  this.x = "---";
  this.y = "---";
  
  
  this.tareaEditando.latitud = "---";
  this.tareaEditando.logitud= "---";
  this.tareaEditando.user= this.user;


  this.firestoreService.actualizar("Coordenadas", this.user, this.tareaEditando).then(() => {
  this.tareaEditando = {} as Tarea;
    })
}

locate() {

  try{
    const options = {
      enableHighAccuracy: true,
      timeout: 200,
      maximumAge: 0,
    };
    
    const success = ( pos: { coords: any; }) => {
      const crd = pos.coords;

      this.x = "" + crd.latitude;
      this.y = "" + crd.longitude;

      this.tareaEditando.latitud = "" + crd.latitude;
      this.tareaEditando.logitud= "" + crd.longitude;
      this.tareaEditando.user= this.user;
      this.firestoreService.actualizar("Coordenadas", this.user, this.tareaEditando).then(() => {
      this.tareaEditando = {} as Tarea;
      //this.backgroundMode.enable();
    })

    }
    
    function error(err: { code: any; message: any; }) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    this.id = navigator.geolocation.watchPosition(success, error, options);
  }catch(err){
    alert("Error" + err)
  }
  };
}