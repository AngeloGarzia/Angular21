import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalStorageService } from '../localstorageservice';  
import { Product } from '../../../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './product-add.html',
  styleUrls: ['./product-add.css']
})
export class ProductAdd implements OnInit {
  angForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lss: LocalStorageService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', [Validators.required, Validators.maxLength(50)]],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit() {
    if (this.angForm.valid) {
      const product: Product = this.angForm.value;
      this.lss.add(product);
      this.router.navigate(['/products']);
    }
  }
}
