import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductDTO } from '../dtos/product.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  loading = false
  products: ProductDTO[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true
    this.productService.getProducts().subscribe((products) => {
      this.products = products.data
      this.loading = false
    })
  }
}
