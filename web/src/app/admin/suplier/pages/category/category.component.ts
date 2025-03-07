// import { Component } from '@angular/core';
// import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Category } from '../../../../models/category.model';


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyProductService } from '../../../../shared/company-product.service';
import { Category } from '../../../../models/category.model';
import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { CategoryProductService } from '../../../../shared/category-product.service';
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
    editingCategoryId?: number;  // Optional ID
    martId: number = 1; // Replace with actual mart ID from authentication
  
    constructor(private fb: FormBuilder, private categoryProductService: CategoryProductService) {}
  
    ngOnInit(): void {
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
      });
  
      this.loadCategories();
    }
  
    async onSubmit(): Promise<void> {
      if (this.categoryForm.valid) {
        const categoryData: Category = {
          id: this.editingCategoryId ?? undefined, // Ensure id is optional
          name: this.categoryForm.value.name,
          description: this.categoryForm.value.description,
        };
  
        try {
          if (this.editingCategoryId !== undefined) {
            // Update existing category
            await this.categoryProductService.updateCategory(this.martId, this.editingCategoryId, categoryData);
            console.log('Category updated successfully!');
          } else {
            // Add new category
            await this.categoryProductService.addCategory(this.martId, categoryData);
            console.log('Category added successfully!');
          }
          this.resetForm();
        } catch (error) {
          console.error('Error saving category:', error);
        }
      } else {
        console.error('Form is invalid');
      }
    }
  
    resetForm(): void {
      this.categoryForm.reset();
      this.showAddCategoryForm = false;
      this.editingCategoryId = undefined;
      this.loadCategories();
    }
  
    filterCategories(): void {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    async deleteCategory(categoryId?: number): Promise<void> {
      if (!categoryId) return;
  
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await this.categoryProductService.deleteCategory(this.martId, categoryId);
          console.log('Category deleted successfully!');
          this.loadCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }
    }
  
    loadCategories(): void {
      this.categoryProductService.getCategories(this.martId).subscribe({
        next: (categories) => {
          this.categories = categories;
          this.filteredCategories = categories;
        },
        error: (error) => console.error('Error loading categories:', error),
      });
    }
  
    openAddCategoryModal(): void {
      this.showAddCategoryForm = true;
      this.editingCategoryId = undefined;
    }
  
    cancelAddCategory(): void {
      this.resetForm();
    }
  
    editCategory(category: Category): void {
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
      });
  
      // Ensure editingCategoryId is assigned only a number
      this.editingCategoryId = category.id; // Now it's optional, no errors
      this.showAddCategoryForm = true;
    }
  }
  