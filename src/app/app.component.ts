import { LoaderComponent } from './shared/loader/loader.component';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') == null || Boolean(localStorage.getItem('isLoggedIn')) == true) {
      localStorage.clear();
      localStorage.setItem('isLoggedIn', 'false');
    }
  }
  title = 'samuel-nfc-control-panel';
  ngonint
}
