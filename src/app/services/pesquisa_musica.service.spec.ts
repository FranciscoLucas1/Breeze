import { TestBed } from '@angular/core/testing';
import { PesquisarMusicaService } from './pesquisa_musica.service';

describe('MusicSearchService', () => {
  let service: PesquisarMusicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisarMusicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
