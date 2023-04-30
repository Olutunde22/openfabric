import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Observable, map } from 'rxjs';
import { ProductDTO } from '../../dtos/product.dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetails!: ProductDTO
  loading: boolean = false
  selected = 1

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loading = true
    const productId = this.router.snapshot.paramMap.get('productId')
    if (productId) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.productDetails = product.data
        this.loading = false
      })
    }
  }

}
