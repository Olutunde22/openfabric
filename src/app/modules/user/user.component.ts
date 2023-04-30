import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductDTO } from '../home/dtos/product.dto';
import { ProductService } from 'src/app/services/product.service';
import { ProductData, SharedService } from './shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type actions = 'Edit' | 'Create' | 'Cancel' | 'Delete';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data!: ProductDTO;
  firstName!: string;
  loading: boolean = false
  dialogRef!: MatDialogRef<ProductDialogComponent, any>
  errorMessage!: string

  constructor(public dialog: MatDialog, private productService: ProductService, private sharedService: SharedService, private _snackBar: MatSnackBar) { }


  openDialog(action: actions, obj?: any) {
    this.data = {
      ...obj,
      action: action
    };
    this.dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      data: this.data
    });
  }

  displayedColumns: string[] = ['name', 'imageUrl', 'description', 'price', 'action'];
  dataSource: ProductDTO[] = []


  ngOnInit(): void {
    this.loading = true
    this.getProducts()
    this.sharedService.product$.subscribe((data) => {
      this.performAction(data)
    })
  }

  performAction(data: ProductData) {
    this.sharedService.setLoading(true)
    if (data.event == 'Create') {
      this.createProduct(data)
    } else if (data.event == 'Edit') {
      this.updateProduct(data)
    } else if (data.event == 'Delete') {
      this.deleteProduct()
    }
  }

  closeModal() {
    this.getProducts()
    this.dialogRef.close()
    this._snackBar.open('Successful!', 'DISCARD', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      if (products.success) {
        this.dataSource = products.data
        this.loading = false
      }
    })
  }

  createProduct(data: ProductData) {
    this.productService.createProduct(data.data).subscribe({
      next: () => this.closeModal(),
      error: (error) => this.sendErrorMessage(error.error.message)
    });
  }

  updateProduct(data: ProductData) {
    this.productService.updateProduct(this.data._id, data.data).subscribe({
      next: () => this.closeModal(),
      error: (error) => this.sendErrorMessage(error.error.message)
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.data._id).subscribe({
      next: () => this.closeModal(),
      error: (error) => this.sendErrorMessage(error.error.message)
    });
  }

  sendErrorMessage(error: string) {
    this.sharedService.sendErrorMessage(error)
    setTimeout(() => {
      this.sharedService.sendErrorMessage('')
    }, 3000)
  }
}