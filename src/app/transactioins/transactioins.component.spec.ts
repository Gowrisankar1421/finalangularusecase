import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactioinsComponent } from './transactioins.component';

describe('TransactioinsComponent', () => {
  let component: TransactioinsComponent;
  let fixture: ComponentFixture<TransactioinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactioinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactioinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
