import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../../../components/components-with-forms.module';
import { Category } from '../../../../../models/category.model';
import { CategoryService } from '../../../../../shared/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  category: Category = { name: '', description: '' };
  message = '';

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addCategory() {
    if (!this.category.name) {
      this.message = 'Category name is required!';
      return;
    }

    this.categoryService.createCategory(this.category).subscribe({
      next: (response) => {
        this.message = response.message;
        this.category = { name: '', description: '' }; // Reset form
      },
      error: (err) => {
        this.message = 'Error: ' + err.error.message;
      },
    });
  }
}