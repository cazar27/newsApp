import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  public ngOnInit(): void { }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('auth/');
  }

}
