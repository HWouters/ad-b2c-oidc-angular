import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit, OnDestroy {

	constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
	  if (this.oidcSecurityService.moduleSetup) {
			this.doCallbackLogicIfRequired();
		} else {
			this.oidcSecurityService.onModuleSetup.subscribe(() => {
				this.doCallbackLogicIfRequired();
			});
		}
	}

	ngOnInit() {

	//this.router.navigate(['/home']);
	}

	ngOnDestroy(): void {
		this.oidcSecurityService.onModuleSetup.unsubscribe();
	}

	private doCallbackLogicIfRequired() {
		if (window.location.hash) {
			this.oidcSecurityService.authorizedCallback();
		}
	}
}
