import { DataService } from './../data.service';
import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  btnDisabled = false;

  constructor(
    private router: Router,
    private apiService: RestApiService,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.dataService.error("Password is not enterd");
      }
    } else {
      this.dataService.error("Email is not enterd");
    }
  }

  async login() {
    this.btnDisabled = true;
    let loginUrl = "http://localhost:4000/gloify/accounts/signin";
    try {
      if (this.validate()) {
        const data = await this.apiService.post(loginUrl, {
          email: this.email,
          password: this.password
        });
        if (data["success"]) {
          localStorage.setItem('token', data['token']);
          await this.dataService.getProfile();
          this.router.navigate(["/"]);
        } else {
          this.dataService.error(data["message"]);
        }
      }
    } catch (error) {
      this.dataService.error(error["message"]);
    }
    this.btnDisabled = false;
  }
}
