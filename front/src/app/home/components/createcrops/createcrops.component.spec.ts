import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecropsComponent } from './createcrops.component';

describe('CreatecropsComponent', () => {
  let component: CreatecropsComponent;
  let fixture: ComponentFixture<CreatecropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecropsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatecropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
