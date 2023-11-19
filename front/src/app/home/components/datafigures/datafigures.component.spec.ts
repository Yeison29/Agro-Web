import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafiguresComponent } from './datafigures.component';

describe('DatafiguresComponent', () => {
  let component: DatafiguresComponent;
  let fixture: ComponentFixture<DatafiguresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatafiguresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatafiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
