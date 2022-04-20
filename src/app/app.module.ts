import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TopBreadcrumbComponent } from './top-breadcrumb/top-breadcrumb.component';
import { OpenlayersMapComponent } from './openlayers-map/openlayers-map.component';
import { DrawtoolsComponent } from './drawtools/drawtools.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    TopBreadcrumbComponent,
    OpenlayersMapComponent,
    DrawtoolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
