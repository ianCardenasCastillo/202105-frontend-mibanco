import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinatarioComponent } from './add-destinatario.component';

describe('AddDestinatarioComponent', () => {
  let component: AddDestinatarioComponent;
  let fixture: ComponentFixture<AddDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDestinatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
