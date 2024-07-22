
import { inject } from '@angular/core';
import { WINDOW, DOCUMENT } from '../../../script/windowInjectionToken';
import { Component, OnDestroy, OnInit } from '@angular/core';

// const _window = inject(WINDOW);
// const _document = inject(DOCUMENT);



@Component({
  selector: 'app-some-comp',
  templateUrl: './some-comp.component.html',
  styleUrls: ['./some-comp.component.less']
})
export class SomeCompComponent  implements OnInit, OnDestroy {
  numberOfClicks = 0;
  // @HostListener('click')
  onClick() {
    this.numberOfClicks++;
    this.updateLS();
    this.createElement();
  }

  private _document = inject(DOCUMENT);



  updateLS(){
    localStorage.setItem('count', (this.numberOfClicks).toString());
  }

  createElement() {
    const div = this._document.createElement('div');
    div.textContent = `number of clicks: ${this.numberOfClicks}`
    this._document.getElementById('header')?.appendChild(div);
  }

  // private clickListener: (() => void) | undefined;

  constructor() {
    // const _document = inject(DOCUMENT);
  }

  ngOnInit() {
    // this.clickListener = this.onClick.bind(this);
    // this.el.nativeElement.querySelector('#header').addEventListener('click', this.clickListener);
  }


  ngOnDestroy() {
    // this.el.nativeElement.querySelector('#header').removeEventListener('click', this.clickListener);
  }
}