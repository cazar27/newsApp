import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    service = TestBed.inject(NewsService);
  });

  it('Test New Service newNew', () => {
    spyOn(service,'newNew');
    service.newNew('Nueva Noticia','Nueva Descripcion',11);
    expect(service.newNew).toHaveBeenCalled();
  });

  it('Test New Service updateNew', () => {
    spyOn(service,'updateNew');
    service.updateNew('Nueva Noticia','Nueva Descripcion',11);
    expect(service.updateNew).toHaveBeenCalled();
  });

  it('Test New Service getNews', () => {
    spyOn(service,'getNews');
    service.getNews(1);
    service.getNews(1,1);
    expect(service.getNews).toHaveBeenCalled();
  });

  it('Test New Service getNewById', () => {
    spyOn(service,'getNewById');
    service.getNewById('11');
    expect(service.getNewById).toHaveBeenCalled();
  });

  it('Test New Service deleteNew', () => {
    spyOn(service,'deleteNew');
    service.deleteNew('11');
    expect(service.deleteNew).toHaveBeenCalled();
  });
});
