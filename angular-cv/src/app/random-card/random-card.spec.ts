import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCard } from './random-card';

describe('RandomCard', () => {
  let component: RandomCard;
  let fixture: ComponentFixture<RandomCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
