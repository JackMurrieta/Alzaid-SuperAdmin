import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstanciaViewModal } from './estancia-view-modal';

describe('EstanciaViewModal', () => {
  let component: EstanciaViewModal;
  let fixture: ComponentFixture<EstanciaViewModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstanciaViewModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstanciaViewModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
