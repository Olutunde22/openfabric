import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id$!: Observable<string | null>
  productDetails: any
  selected = 1

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id$ = this.router.paramMap.pipe(
      map(params => params.get('productId'))
    )

    this.productDetails = this.getProductDetails()
  }

  getProductDetails() {

  }

}
