import { Component } from '@angular/core';
import { UserserviceService } from './account/userservice.service';
import { CurrentuserService } from './currentuser.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gspbanking';
  
}
