import { WINDOW } from "/home/Timoshenkov.AY/Desktop/mine/ssr-testing-app/script/InjectionTokens";
import { DOCUMENT } from "@angular/common";
import { Component, HostBinding, inject } from '@angular/core';
@Component({
  selector: 'app-some-comp',
  templateUrl: './some-comp.component.html',
  styleUrls: ['./some-comp.component.less']
})
export class SomeCompComponent {
  private _window = inject(WINDOW);
  private _document = inject(DOCUMENT);

  @HostBinding('style.margin') margin = '10px';
  @HostBinding('style.padding') padding = '50px';
  @HostBinding('style.border') border = 'solid 1px black';
  @HostBinding('style.boxShadow') boxShadow = '5px 5px rgba(0, 128, 128, 0.5)';

  numberOfClicks = 0;

  onClick() {
    this.numberOfClicks++;
    this.updateLS();
    this.createElement();
  }

  updateLS(){
    this._window.localStorage.setItem('count', (this.numberOfClicks).toString());
  }

  createElement() {
    const div = this._document.createElement('div');
    div.innerText = 'Number of clicks is ' + (this.numberOfClicks).toString();
    const header = this._document.getElementById('header');
    header?.appendChild(div);
  }

  constructor() {
    console.log('this is constructor')
      this.createElement();
    }
}