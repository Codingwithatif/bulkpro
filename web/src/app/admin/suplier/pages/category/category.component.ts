import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from '../../../../shared/category.service';


import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // categoryForm: FormGroup;
  // categories: any[] = [];
  // filteredCategories: any[] = [];
  // searchTerm: string = '';
  // showAddCategoryForm = false;
  // editingCategory: any = null;
  // http: any;

  // constructor(private fb: FormBuilder, private categoryService: CategoryService) {
  //   this.categoryForm = this.fb.group({
  //     name: ['', Validators.required],
  //     description: [''],
  //   });
  // }

  // ngOnInit(): void {
  //   this.loadCategories();
  // }

  // loadCategories() {
  //   this.categoryService.getCategories().subscribe((data) => {
  //     this.categories = data;
  //     this.filteredCategories = data;
  //   });
  // }

  // openAddCategoryModal() {
  //   this.showAddCategoryForm = true;
  //   this.categoryForm.reset();
  //   this.editingCategory = null;
  // }

  // onSubmit() {
  //   if (this.editingCategory) {
  //     this.categoryService
  //       .updateCategory(this.editingCategory.id, this.categoryForm.value)
  //       .subscribe(() => this.loadCategories());
  //   } else {
  //     this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
  //       this.loadCategories();
  //       this.showAddCategoryForm = false;
  //     });
  //   }
  // }
  // addCategory(category: any): Observable<any> {
  //   return this.http.post('http://localhost:3000/category/create', category);
  // }
  
  // cancelAddCategory() {
  //   this.showAddCategoryForm = false;
  // }

  // filterCategories() {
  //   this.filteredCategories = this.categories.filter((category) =>
  //     category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
}
