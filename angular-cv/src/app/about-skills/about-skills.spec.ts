import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSkills } from './about-skills';

describe('AboutSkills', () => {
  let component: AboutSkills;
  let fixture: ComponentFixture<AboutSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
