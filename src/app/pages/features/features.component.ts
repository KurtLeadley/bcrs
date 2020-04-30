import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';
import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;
  serviceList: Service[] = [];
  constructor(public sService: ServiceService) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('presentation-page');

    this.sService.getServices().subscribe((serviceList) => {
      setTimeout(() => {
        this.serviceList = serviceList;
        console.log(serviceList);
      }, 500);
    });
  }

  play(): void {
    this.ngxGlide.play();
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('presentation-page');
  }
}
