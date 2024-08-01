import { Component, HostBinding } from '@angular/core';
@Component({
  selector: 'app-some-comp',
  templateUrl: './some-comp.component.html',
  styleUrls: ['./some-comp.component.less']
})
export class SomeCompComponent {

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
    localStorage.setItem('count', (this.numberOfClicks).toString());
  }

  updateLS2(){
    window.localStorage.setItem('count', (this.numberOfClicks).toString());
  }

  createElement() {
    const div = document.createElement('div');
    div.innerText = 'Number of clicks is ' + (this.numberOfClicks).toString();
    const header = document.getElementById('header');
    header?.appendChild(div);
  }

  constructor() {
    console.log('this is constructor')
      this.createElement();
    }
}