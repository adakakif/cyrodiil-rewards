import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCountdownComponent } from './monthly-countdown.component';

describe('MonthlyCountdownComponent', () => {
  let component: MonthlyCountdownComponent;
  let fixture: ComponentFixture<MonthlyCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCountdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
