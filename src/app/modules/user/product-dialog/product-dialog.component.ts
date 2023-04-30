import { Component, Inject, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { actions } from '../user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDTO } from '../../home/dtos/product.dto';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  action!: actions
  productForm!: FormGroup
  editedData!: ProductDTO
  errorMessage!: string
  loading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    private sharedService: SharedService,
    @Optional() @Inject(MAT_DIALOG_DATA) public productData: any,
  ) { }

  ngOnInit(): void {
    this.action = this.productData.action
    this.productForm = this.fb.group({
      name: ['', { validators: [Validators.required] }],
      imageUrl: ['', { validators: [Validators.required] }],
      description: ['', { validators: [Validators.required] }],
      price: ['', { validators: [Validators.required] }],
    })

    this.productForm.patchValue({
      ...this.productData
    })
    this.sharedService.getErrorMessage().subscribe(message => {
      this.errorMessage = message
    })

    this.sharedService.getLoading().subscribe(loading => {
      this.loading = loading
    })
  }

  doAction() {
    this.sharedService.sendProductEventData({
      event: this.action,
      data: {
        name: this.productForm.get('name')?.value,
        imageUrl: this.productForm.get('imageUrl')?.value,
        description: this.productForm.get('description')?.value,
        price: this.productForm.get('price')?.value
      }
    })
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
