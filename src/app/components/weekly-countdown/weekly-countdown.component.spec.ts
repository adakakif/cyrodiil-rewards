import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCountdownComponent } from './weekly-countdown.component';

describe('WeeklyCountdownComponent', () => {
  let component: WeeklyCountdownComponent;
  let fixture: ComponentFixture<WeeklyCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyCountdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
