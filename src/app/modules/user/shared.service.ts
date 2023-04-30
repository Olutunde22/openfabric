import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

  private subject = new Subject<ProductData>();
  private errorMessage = new Subject<string>();
  private loading = new Subject<boolean>();

  sendProductEventData(productData: ProductData) {
    this.subject.next(productData);
  }
  getProductEventData(): Observable<ProductData> {
    return this.subject.asObservable();
  }

  sendErrorMessage(errorMessage: string) {
    this.errorMessage.next(errorMessage)
  }

  getErrorMessage() {
    return this.errorMessage.asObservable()
  }

  setLoading(loading: boolean) {
    this.loading.next(loading)
  }

  getLoading() {
    return this.loading.asObservable()
  }

}
