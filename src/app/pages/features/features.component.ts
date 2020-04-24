import { Component, OnInit, OnDestroy } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('sections-page');

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
