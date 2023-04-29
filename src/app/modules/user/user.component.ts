import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

export type actions = 'Edit' | 'Create' | 'Cancel' | 'Delete';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  data: any;

  openDialog(action: actions, obj?: any) {
    this.data = {
      ...obj,
      action: action
    };
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '600px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        // this.createProduct(result.data);
      } else if (result.event == 'Update') {
        // this.updateProduct(result.data);
      } else if (result.event == 'Delete') {
        // this.deleteProduct(result.data);
      }
    });
  }

  displayedColumns: string[] = ['name', 'imageUrl', 'price', 'action'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Product {
  productName: string;
  productPrice: number;
  productImageUrl: string;
}

const ELEMENT_DATA: Product[] = [
  { productName: 'Hydrogen', productPrice: 1.0079, productImageUrl: 'H' },
  { productName: 'Helium', productPrice: 4.0026, productImageUrl: 'He' },
  { productName: 'Lithium', productPrice: 6.941, productImageUrl: 'Li' },
  { productName: 'Beryllium', productPrice: 9.0122, productImageUrl: 'Be' },
  { productName: 'Boron', productPrice: 10.811, productImageUrl: 'B' },
  { productName: 'Carbon', productPrice: 12.0107, productImageUrl: 'C' },
  { productName: 'Nitrogen', productPrice: 14.0067, productImageUrl: 'N' },
  { productName: 'Oxygen', productPrice: 15.9994, productImageUrl: 'O' },
  { productName: 'Fluorine', productPrice: 18.9984, productImageUrl: 'F' },
  { productName: 'Neon', productPrice: 20.1797, productImageUrl: 'Ne' },
  { productName: 'Sodium', productPrice: 22.9897, productImageUrl: 'Na' },
  { productName: 'Magnesium', productPrice: 24.305, productImageUrl: 'Mg' },
  { productName: 'Aluminum', productPrice: 26.9815, productImageUrl: 'Al' },
  { productName: 'Silicon', productPrice: 28.0855, productImageUrl: 'Si' },
  { productName: 'Phosphorus', productPrice: 30.9738, productImageUrl: 'P' },
  { productName: 'Sulfur', productPrice: 32.065, productImageUrl: 'S' },
  { productName: 'Chlorine', productPrice: 35.453, productImageUrl: 'Cl' },
  { productName: 'Argon', productPrice: 39.948, productImageUrl: 'Ar' },
  { productName: 'Potassium', productPrice: 39.0983, productImageUrl: 'K' },
  { productName: 'Calcium', productPrice: 40.078, productImageUrl: 'Ca' },
];

