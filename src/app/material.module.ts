import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
