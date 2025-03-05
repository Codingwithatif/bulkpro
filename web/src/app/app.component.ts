import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(
    private http: HttpClient
  ) {
        
  }
  
  ngOnInit(): void {
    this.http.get('http://localhost:3000/auth/getUSer').subscribe(user => {
      console.log(JSON.parse(user as any));
      
    })
  }
  title = 'web';
}
