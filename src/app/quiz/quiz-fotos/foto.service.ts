import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FotoService {
  fotosChange = new Subject<any[]>();
  constructor(private storage: AngularFireStorage) {}


  getList(id) {
    this.storage.storage.ref()
      .child(id)
      .listAll()
      .then((fotoList) => {
        const fotoArr = [];
        const promiseArr = [];
        fotoList.items.forEach(item => {
          const prom =  this.getFile(item.fullPath).toPromise()
            .then(fotoUrl => {
              fotoArr.push(fotoUrl);
              promiseArr.push(prom);
            });
        });
        Promise.all(promiseArr).then(() => {
          this.fotosChange.next(fotoArr);
        });
      })
      .catch(error => console.log(error));
  }

  uploadFile(id, foto) {
    const filePath = id + '/' + foto.name;
    const task = this.storage.upload(filePath, foto);
    this.getList(id);
  }

  getFile(url) {
    const ref = this.storage.ref(url);
    return ref.getDownloadURL();
  }

}
