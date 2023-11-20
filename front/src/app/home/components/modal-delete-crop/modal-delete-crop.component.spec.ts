import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteCropComponent } from './modal-delete-crop.component';

describe('ModalDeleteCropComponent', () => {
  let component: ModalDeleteCropComponent;
  let fixture: ComponentFixture<ModalDeleteCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteCropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
