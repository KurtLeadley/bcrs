/**
 * Title: services/loader.service.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loader } from '../models/loader.model';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new Subject<Loader>();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}

  show() {
    this.loaderSubject.next(<Loader>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<Loader>{ show: false });
  }
}
