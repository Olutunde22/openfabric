import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../appConfig/appConfig.service';
import { AppConfig } from '../appConfig/appConfig.interface';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '../modules/home/dtos/product.dto';
import { ResponseDTO } from './dtos/response.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProducts() {
    return this.http.get<ResponseDTO<ProductDTO[]>>(`${this.config.apiEndpoint}/product`)
  }

  getProductById(productId: string) {
    return this.http.get<ResponseDTO<ProductDTO>>(`${this.config.apiEndpoint}/product/${productId}`)
  }

  createProduct(productData: Partial<ProductDTO>) {
    return this.http.post<ResponseDTO<ProductDTO>>(`${this.config.apiEndpoint}/product`, { ...productData, createdBy: this.authService.getUserDetailsFromToken()._id })
  }

  updateProduct(productId: string, productData: Partial<ProductDTO>) {
    return this.http.put<ResponseDTO<ProductDTO>>(`${this.config.apiEndpoint}/product/${productId}`, productData)
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.config.apiEndpoint}/product/${productId}`)
  }
}
