import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  constructor(private router: Router, private auth: AuthService) {}
  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      localStorage.setItem('token', user.json().id_token);
      this.router.navigateByUrl('/status');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
