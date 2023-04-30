import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { APP_SERVICE_CONFIG } from '../appConfig/appConfig.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, {
        provide: APP_SERVICE_CONFIG,
        useValue: {
          apiEndpoint: 'testing'
        }
      }]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
