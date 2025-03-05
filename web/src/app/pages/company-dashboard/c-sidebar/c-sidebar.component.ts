import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-c-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './c-sidebar.component.html',
  styleUrl: './c-sidebar.component.scss'
})
export class CSidebarComponent {
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('[data-widget="treeview"]').Treeview('init');
    });
  }
}
