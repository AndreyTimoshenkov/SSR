import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

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

  updateLS(){
    localStorage.setItem('count', (this.numberOfClicks).toString());
  }

  createElement() {
    const div = document.createElement('div');
    div.textContent = `number of clicks: ${this.numberOfClicks}`
    document.getElementById('header')?.appendChild(div);
  }

  // private clickListener: (() => void) | undefined;

  // constructor(private el: ElementRef) {}

  ngOnInit() {
    // this.clickListener = this.onClick.bind(this);
    // this.el.nativeElement.querySelector('#header').addEventListener('click', this.clickListener);
  }


  ngOnDestroy() {
    // this.el.nativeElement.querySelector('#header').removeEventListener('click', this.clickListener);
  }
}