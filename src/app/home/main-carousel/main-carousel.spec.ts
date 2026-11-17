import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MainCarousel } from './main-carousel';

describe('MainCarousel', () => {
  let component: MainCarousel;
  let fixture: ComponentFixture<MainCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCarousel],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
