import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEventosComponent } from './lista-de-eventos.component';

describe('ListaDeEventosComponent', () => {
  let component: ListaDeEventosComponent;
  let fixture: ComponentFixture<ListaDeEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDeEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
