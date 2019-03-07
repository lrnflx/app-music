import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  onSubmit(form: NgForm){
    console.log(form.value['email'])
    this.authService.authenticate(form.value['email'], form.value['password']).then(
      () => {
        console.log('Sign in successfull!');
        this.authService.isAuth = true;
        this.router.navigate(['admin']);
      }
    ).catch(
      error => {
        this.messageError = 'error Login or password'
      }
    );
  }
}
