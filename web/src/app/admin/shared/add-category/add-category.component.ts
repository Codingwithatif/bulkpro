import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../shared/category.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../models/auth.model';

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
 
   constructor(private categoryService: CategoryService, 
     private http: HttpClient
   ) {}
   ngOnInit(): void {
     throw new Error('Method not implemented.');
   }
 
   addCategory() {
     if (!this.category.name) {
       this.message = 'Category name is required!';
       return;
     }
      let user = localStorage.getItem('user');
      user = user ? JSON.parse(user) : null;

     const category = {
       name: this.category.name,
       description: this.category.description,
       user: user 
     }
     this.http.post('http://localhost:3000/categories/create', category).subscribe(a => {
       console.log(a);
     });
     
   }
 }