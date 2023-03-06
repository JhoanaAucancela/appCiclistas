import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  public consultar(Coordenadas) {
    return this.angularFirestore.collection(Coordenadas).snapshotChanges();
  }


  public actualizar(Coordenadas, documentId, datos) {
    return this.angularFirestore.collection(Coordenadas).doc(documentId).set(datos);
  }
}
