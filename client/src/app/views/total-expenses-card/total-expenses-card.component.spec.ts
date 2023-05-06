import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpensesCardComponent } from './total-expenses-card.component';

describe('TotalExpensesCardComponent', () => {
  let component: TotalExpensesCardComponent;
  let fixture: ComponentFixture<TotalExpensesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalExpensesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalExpensesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
