import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from '../../../../shared/category.service';


import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { Observable } from 'rxjs';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
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