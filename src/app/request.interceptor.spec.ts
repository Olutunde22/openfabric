import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request.interceptor';
import { AuthService } from './services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_SERVICE_CONFIG } from './appConfig/appConfig.service';

describe('RequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      RequestInterceptor,
      AuthService,
      {
        provide: APP_SERVICE_CONFIG,
        useValue: {
          apiEndpoint: 'testing'
        }
      }
    ]
  }));

  it('should be created', () => {
    const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
