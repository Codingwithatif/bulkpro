import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../../../components/components-with-forms.module';
import { Category } from '../../../../../models/category.model';
import { CategoryProductService } from '../../../../../shared/category-product.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  showAddCategoryForm: boolean = false;
  editingCategoryId: number | null = null; // Now explicitly allows null
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
    if (this.categoryForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const categoryData: Category = {
      id: this.editingCategoryId ?? undefined, // Ensure id is optional
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description,
    };

    try {
      if (this.editingCategoryId !== null) {
        await this.categoryProductService.updateCategory(this.martId, this.editingCategoryId, categoryData);
        console.log('Category updated successfully!');
      } else {
        await this.categoryProductService.addCategory(this.martId, categoryData);
        console.log('Category added successfully!');
      }
      this.resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.showAddCategoryForm = false;
    this.editingCategoryId = null;
    this.loadCategories();
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async deleteCategory(categoryId?: number): Promise<void> {
    if (!categoryId || !confirm('Are you sure you want to delete this category?')) return;

    try {
      await this.categoryProductService.deleteCategory(this.martId, categoryId);
      console.log('Category deleted successfully!');
      this.loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  async loadCategories(): Promise<void> {
    try {
      const categories = await lastValueFrom(this.categoryProductService.getCategories(this.martId));
      this.categories = categories ?? []; // Ensures categories is always an array
      this.filteredCategories = this.categories;
    } catch (error) {
      console.error('Error loading categories:', error);
      this.categories = []; // Fallback to an empty array on error
      this.filteredCategories = [];
    }
  }
  

  openAddCategoryModal(): void {
    this.showAddCategoryForm = true;
    this.editingCategoryId = null;
  }

  cancelAddCategory(): void {
    this.resetForm();
  }

  editCategory(category: Category): void {
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
    });

    this.editingCategoryId = category.id ?? null; // Ensures valid ID or null
    this.showAddCategoryForm = true;
  }
}
