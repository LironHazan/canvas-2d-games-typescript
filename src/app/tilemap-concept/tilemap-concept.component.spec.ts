import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilemapConceptComponent } from './tilemap-concept.component';

describe('TilemapConceptComponent', () => {
  let component: TilemapConceptComponent;
  let fixture: ComponentFixture<TilemapConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilemapConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilemapConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
