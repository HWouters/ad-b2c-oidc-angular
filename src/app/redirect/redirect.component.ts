import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  template: '<p>Signing in...</p>'
})
export class RedirectComponent implements OnInit, OnDestroy {

	constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
		console.log("redirect constructor");
	  if (this.oidcSecurityService.moduleSetup) {
		  console.log("redirect constructor moduleSetup");
			this.doCallbackLogicIfRequired();
		} else {
			console.log("redirect constructor subscribe");
			this.oidcSecurityService.onModuleSetup.subscribe(() => {
				this.doCallbackLogicIfRequired();
			});
		}
	}

	ngOnInit() {

	console.log("redirect ngOnInit");
	//this.router.navigate(['/home']);
	}

	ngOnDestroy(): void {
		console.log("redirect ngOnDestroy");
		this.oidcSecurityService.onModuleSetup.unsubscribe();
	}

	private doCallbackLogicIfRequired() {
		console.log("redirect doCallbackLogicIfRequired");
		if (window.location.hash) {
			this.oidcSecurityService.authorizedCallback();
		}
	}
}
