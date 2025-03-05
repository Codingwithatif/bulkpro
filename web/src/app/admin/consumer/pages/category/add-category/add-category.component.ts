import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../../../components/components-with-forms.module';
import { Category } from '../../../../../models/category.model';
import { CategoryProductService } from '../../../../../shared/category-product.service';

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
  editingCategoryId: string | null = null; // Track editing mode
  martId: string = 'your-mart-id'; // Replace with actual mart ID

  constructor(private fb: FormBuilder, private categoryProductService: CategoryProductService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.loadCategories();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: Category = {
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
      };

      if (this.editingCategoryId) {
        // Update existing category
        this.categoryProductService.updateCategory(this.martId, this.editingCategoryId, categoryData)
          .then(() => {
            console.log('Category updated successfully!');
            this.resetForm();
          })
          .catch((error: any) => console.error('Error updating category:', error));
      } else {
        // Add new category
        this.categoryProductService.addCategory(this.martId, categoryData)
          .then(() => {
            console.log('Category added successfully!');
            this.resetForm();
          })
          .catch(error => console.error('Error adding category:', error));
      }
    } else {
      console.error('Form is invalid');
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

  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryProductService.deleteCategory(this.martId, categoryId)
        .then(() => {
          console.log('Category deleted successfully!');
          this.loadCategories();
        })
        .catch(error => console.error('Error deleting category:', error));
    }
  }

  loadCategories(): void {
    this.categoryProductService.getCategories(this.martId).subscribe(categories => {
      this.categories = categories;
      this.filteredCategories = categories;
    });
  }

  openAddCategoryModal(): void {
    this.showAddCategoryForm = true;
    this.editingCategoryId = null; // Reset edit mode
  }

  cancelAddCategory(): void {
    this.resetForm();
  }

  editCategory(category: Category): void {
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
    });
  
    this.editingCategoryId = category.id ?? null; // Ensure it's either string or null
    this.showAddCategoryForm = true;
  }
}
