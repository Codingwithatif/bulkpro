// import { Component } from '@angular/core';
// import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Category } from '../../../../models/category.model';


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyProductService } from '../../../../shared/company-product.service';
import { Category } from '../../../../models/category.model';
import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryForm!: FormGroup;
categories: Category[] = [];
filteredCategories: Category[] = [];
searchTerm: string = '';
showAddCategoryForm: boolean = false;

constructor(private fb: FormBuilder, private companyProductService: CompanyProductService) {}

ngOnInit(): void {
  this.categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  this.loadCategories();
}

// Add or edit a category
onSubmit(): void {
  if (this.categoryForm.valid) {
    const categoryData: Category = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description,
    };

    if (this.categoryForm.value.id) {
      // Update existing category
      this.companyProductService
        .addCategory(categoryData)
        .then(() => {
          console.log('Category updated successfully!');
          this.resetForm();
          this.loadCategories();
        })
        .catch((error) => console.error('Error updating category:', error));
    } else {
      // Add new category
      this.companyProductService
        .addCategory(categoryData)
        .then(() => {
          console.log('Category added successfully!');
          this.resetForm();
          this.loadCategories();
        })
        .catch((error) => console.error('Error adding category:', error));
    }
  } else {
    console.error('Form is invalid');
  }
}

// Load all categories
loadCategories(): void {
  this.companyProductService.getCategories().subscribe((categories: Category[]) => {
    this.categories = categories;
    this.filteredCategories = categories;
  });
}

// Delete a category
deleteCategory(categoryId: string): void {
  if (window.confirm('Are you sure you want to delete this category?')) {
    this.companyProductService
      .deleteCategory(categoryId)
      .then(() => {
        console.log('Category deleted successfully!');
        this.loadCategories();
      })
      .catch((error) => console.error('Error deleting category:', error));
  }
}

// Filter categories based on search term
filterCategories(): void {
  this.filteredCategories = this.categories.filter((category) =>
    category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

// Open add category form
openAddCategoryModal(): void {
  this.showAddCategoryForm = true;
}

// Cancel add/edit category
cancelAddCategory(): void {
  this.resetForm();
  this.showAddCategoryForm = false;
}

// Edit category
editCategory(category: Category): void {
  this.categoryForm.patchValue({ ...category });
  this.showAddCategoryForm = true;
}

// Reset form
private resetForm(): void {
  this.categoryForm.reset();
  this.showAddCategoryForm = false;
}
}