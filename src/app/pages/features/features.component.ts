import { Component, OnInit, OnDestroy } from '@angular/core';
import Glide from '@glidejs/glide';
import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {

  serviceList: Service[] = [];
  constructor(public sService: ServiceService) {}

  ngOnInit() {

    this.sService.getServices().subscribe((serviceList) => {
      setTimeout(() => {
        this.serviceList = serviceList;
        console.log(serviceList);
      }, 500);
    });

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    new Glide('.glide1', {
      type: 'carousel',
      perView: 4,
      startAt: 2,
      focusAt: 2,
    }).mount();
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('sections-page');
  }
}
