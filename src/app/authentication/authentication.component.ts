import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  // public userId;
  constructor(public authService: AuthenticationService, private router: Router) { }
  public isUserLoggedIn: boolean;
  public username: string;
  private check = 0;
  private authCheck = setInterval( () => {this.isUserLoggedIn = this.authService.isAuthenticated();
  // this.userId = localStorage.getItem('userid');
                                          console.log('authCheck: Initializing');
                                          this.check++;
                                          console.log('authCheck: check #' + this.check);
                                          console.log('authCheck: isUserLoggedIn is ' + this.isUserLoggedIn);
                                          console.log('authCheck: username is ' + localStorage.getItem('username'));
                                          if (this.isUserLoggedIn) {
                                            if (localStorage.getItem('username') != null) {
                                              console.log('authCheck: Setting username');
                                              this.setUsername();
                                              console.log('authCheck: Clearing interval');
                                              clearInterval(this.authCheck);
                                            }
                                            else if (this.check === 25) {
                                              console.log('authCheck: Getting username');
                                              this.authService.getUsername();
                                              this.check = 0;
                                            } else if (this.check > 50) {
                                              this.authService.login();
                                            }
                                          } else if (!this.isUserLoggedIn && this.check === 5) {
                                            if (localStorage.getItem('username') != null) {
                                              console.log('authCheck: Logging out');
                                              this.logout();
                                            }
                                            console.log('authCheck: Clearing interval');
                                            clearInterval(this.authCheck);
                                          }}, 500);
  ngOnInit(): void {  }

  logout(): void {
    localStorage.setItem('callback', this.router.url);
    this.authService.logout();
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  login(): void {
    localStorage.setItem('callback', this.router.url);
    this.authService.login();
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  setUsername(): void {
    this.username = localStorage.getItem('username') as string;
  }
}
