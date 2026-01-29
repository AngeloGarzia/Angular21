import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../localstorageservice';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEdit implements OnInit {
  angForm!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private lss: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = +this.route.snapshot.params['id'];
    this.createForm();
    const product = this.lss.getById(this.productId);
    if (product) this.angForm.patchValue(product);
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
      this.lss.update(this.productId, this.angForm.value);
      this.router.navigate(['/products']);
    }
  }
}
