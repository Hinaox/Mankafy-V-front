import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import User from '../../models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: User;
  userSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setUser(this.authService.getUser());
    this.userSubscription = this.authService.userSubject.subscribe((data) => {
      this.setUser(data);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  setUser(data?: User) {
    this.user = data;
  }

  onLogout() {
    this.authService.logout();
  }
}
