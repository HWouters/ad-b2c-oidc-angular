import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService.authorizedCallback();
  }
}
