import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ThankYou } from './thank-you';

describe('ThankYou', () => {
  let component: ThankYou;
  let fixture: ComponentFixture<ThankYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYou],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYou);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
