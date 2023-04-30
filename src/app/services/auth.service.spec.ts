import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_SERVICE_CONFIG } from '../appConfig/appConfig.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: APP_SERVICE_CONFIG,
          useValue: {
            apiEndpoint: 'testing'
          }
        },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user token', () => {
    service.addToken('12345')
    expect(service.getToken()).toBe('12345')
  });

  it('should remove user token', () => {
    service.removeToken()
    expect(service.getToken()).toBe('')
  });

});
