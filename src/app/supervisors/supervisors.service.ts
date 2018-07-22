import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {  Administrator, Promoter , Supervisor } from '../models/user';
import { Event } from '../models/event';
@Injectable()
export class SupervisorsService {
  public supervisorsReference:   AngularFirestoreCollection<Supervisor> = this.afs.collection<Supervisor>('supervisors');
  public supervisorRef: AngularFirestoreDocument<Supervisor>;
  public eventsReference:  AngularFirestoreCollection<Event> = this.afs.collection<Event>('events');      
  constructor(private afs: AngularFirestore,
              private router: Router) {
  }
  public getSupervisor(uid: string): Observable<any> {
    return this.afs.doc(`supervisors/${uid}`).valueChanges();
  }
  public setNewEvent(event: Event, supervisor: Supervisor){
    this.eventsReference.add(event)
    .then(() =>{
        this.updatePromoterStatus(supervisor);
        this.router.navigate(['/']);
    });
  }
  public updatePromoterStatus(supervisor: Supervisor) {
    this.supervisorRef = this.afs.doc(`supervisors/${supervisor.uid}`);
    const data = {
        status: false
    }
    return this.supervisorRef.update(data);
  }
}