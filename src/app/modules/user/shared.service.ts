import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ProductData {
  event: string;
  data: {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private product = new Subject<ProductData>();
  private errorMessage = new Subject<string>();
  private loading = new Subject<boolean>();

  product$ = this.product.asObservable()
  errorMessage$ = this.errorMessage.asObservable()
  loading$ = this.loading.asObservable()

  sendProductEventData(productData: ProductData) {
    this.product.next(productData);
  }

  sendErrorMessage(errorMessage: string) {
    this.errorMessage.next(errorMessage)
  }

  setLoading(loading: boolean) {
    this.loading.next(loading)
  }
}
