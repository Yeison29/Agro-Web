import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateCropComponent } from './modal-update-crop.component';

describe('ModalUpdateCropComponent', () => {
  let component: ModalUpdateCropComponent;
  let fixture: ComponentFixture<ModalUpdateCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateCropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
