import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../localstorageservice'; 
import { Product } from '../../../model/product';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-get.html',
  styleUrls: ['./product-get.css']
})
export class ProductGet implements OnInit {
  products: Product[] = [];

  constructor(private lss: LocalStorageService) {}

  ngOnInit() {
    this.products = this.lss.getAll();
  }

  delete(id: number) {
    if (confirm('Confirmer suppression ?')) {
      this.lss.delete(id);
      this.products = this.lss.getAll();  // Refresh
    }
  }
}

