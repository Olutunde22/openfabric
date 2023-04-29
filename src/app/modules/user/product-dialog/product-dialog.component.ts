import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { actions } from '../user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  action!: actions
  productForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public productData: any
  ) { }


  ngOnInit(): void {
    this.action = this.productData.action
    this.productForm = this.fb.group({
      productName: ['', { validators: [Validators.required] }],
      productImageUrl: ['', { validators: [Validators.required] }],
      productDescription: ['', { validators: [Validators.required] }],
      productPrice: ['', { validators: [Validators.required] }],
    }, { updateOn: 'blur' })

    this.productForm.patchValue({
      ...this.productData
    })
  }

  doAction() {
    // this.dialogRef.close({ event: this.action, data: this.data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


}
