import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
  }

  ngOnInit() {
    this.oidcSecurityService.authorizedCallback();

    this.router.navigate(['/home']);
  }
}
