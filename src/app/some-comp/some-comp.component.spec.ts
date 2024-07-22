import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeCompComponent } from './some-comp.component';

describe('SomeCompComponent', () => {
  let component: SomeCompComponent;
  let fixture: ComponentFixture<SomeCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SomeCompComponent]
    });
    fixture = TestBed.createComponent(SomeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
