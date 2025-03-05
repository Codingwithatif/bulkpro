import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsWithoutFormsModule } from '../../../../components/components-without-forms.module';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [ComponentsWithoutFormsModule, RouterOutlet],
  templateUrl: './content-wrapper.component.html',
  styleUrl: './content-wrapper.component.scss'
})
export class ContentWrapperComponent {
  constructor() {}
}
