import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {convertSnapsChanges} from "../utils/db.utils";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor (private db: AngularFirestore) { }

  loadCountdownTimers(): Observable<Countdown[]> {
    return this.db.collection('/countdown')
        .snapshotChanges()
        .pipe(
            map((results) => {
              return convertSnapsChanges<Countdown>(results)
            })
        );
  }
}

interface Countdown {
  monthly: number,
  weekly: number,
}
