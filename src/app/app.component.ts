import { Component } from '@angular/core';
import { 
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-angular-crud';
  userData !: Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  // INSERT 
  addData(f: any) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value).then(() => {
      console.log('Data saved sucessfully');
    }).catch((err) => {
      console.log(err);
    })
  }

  // GET
  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    // collectionData(collectionInstance).subscribe(val => {
    //   console.log(val);
    // })
    this.userData = collectionData(collectionInstance, { idField: 'id'});
  }

  // UPDATE
  updateDate(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    const updateData = {
      name: 'UpdatedName'
    }
    updateDoc(docInstance, updateData).then(() => {
      console.log('Data Updated');
    }).catch((err) => {
      console.log(err);
    })
  }

  // DELETE
  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance).then(() => {
      console.log('Data Deleted');
    })
  }

}
