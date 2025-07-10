import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaDetalheComponent } from './musica-detalhe.component';

describe('MusicaDetalheComponent', () => {
  let component: MusicaDetalheComponent;
  let fixture: ComponentFixture<MusicaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicaDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
