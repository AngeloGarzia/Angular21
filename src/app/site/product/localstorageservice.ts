import { Injectable } from '@angular/core';
import { Product } from '../../model/product';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly key = 'products';

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  }

  getAll(): Product[] {
    return this.getItem<Product[]>(this.key) || [];
  }

  add(product: Omit<Product, 'id'>): Product {
    const products = this.getAll();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = { id: newId, ...product };
    products.push(newProduct);
    this.setItem(this.key, products);
    return newProduct;
  }

  update(id: number, product: Partial<Product>): void {
    const products = this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...product };
      this.setItem(this.key, products);
    }
  }

  delete(id: number): void {
    const products = this.getAll().filter(p => p.id !== id);
    this.setItem(this.key, products);
  }

  getById(id: number): Product | null {
    return this.getAll().find(p => p.id === id) || null;
  }
}

