import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import JsBarcode from 'jsbarcode';
import { Category } from '../../../../../models/category.model';
import { Product } from '../../../../../models/product.model';
import { CategoryProductService } from '../../../../../shared/category-product.service';
import { ComponentsWithFormsModule } from '../../../../../components/components-with-forms.module';

@Component({
  selector: 'app-add-product',
  standalone: true,
   imports: [ComponentsWithFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
}