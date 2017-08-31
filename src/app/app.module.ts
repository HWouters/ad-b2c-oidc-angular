import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { HomeComponent } from './home/home.component';
import { environment } from './../environments/environment';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'redirect.html', component: RedirectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(oidcSecurityService: OidcSecurityService) {
    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
    openIDImplicitFlowConfiguration.stsServer = 'https://login.microsoftonline.com/tfp/fabrikamb2c.onmicrosoft.com/b2c_1_susi/oauth2/v2.0/';
    openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:65328/redirect.html';
    openIDImplicitFlowConfiguration.client_id = 'e760cab2-b9a1-4c0d-86fb-ff7084abd902';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:65328';
    openIDImplicitFlowConfiguration.startup_route = '/home';
    openIDImplicitFlowConfiguration.forbidden_route = '/home';
    openIDImplicitFlowConfiguration.unauthorized_route = '/home';
    openIDImplicitFlowConfiguration.auto_userinfo = true;
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = !environment.production;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
    openIDImplicitFlowConfiguration.override_well_known_configuration = true;
    openIDImplicitFlowConfiguration.override_well_known_configuration_url =
    'https://login.microsoftonline.com/fabrikamb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=b2c_1_susi';

    oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
}
