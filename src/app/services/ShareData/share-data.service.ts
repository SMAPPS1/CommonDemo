import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.dataSubject.asObservable();

  constructor() {}

  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
