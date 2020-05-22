import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallBricksComponent } from './ball-bricks.component';

describe('BallBricksComponent', () => {
  let component: BallBricksComponent;
  let fixture: ComponentFixture<BallBricksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallBricksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallBricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
