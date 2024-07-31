import { WINDOW } from "/home/Timoshenkov.AY/Desktop/mine/ssr-testing-app/script/InjectionTokens";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomeCompComponent } from './some-comp.component';

@NgModule({
  declarations: [
    SomeCompComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SomeCompComponent
  ]
})
export class SomeCompModule {
  private _window = inject(WINDOW);
}
