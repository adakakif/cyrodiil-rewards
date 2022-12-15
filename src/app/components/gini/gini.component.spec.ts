import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiniComponent } from './gini.component';

describe('GiniComponent', () => {
  let component: GiniComponent;
  let fixture: ComponentFixture<GiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
