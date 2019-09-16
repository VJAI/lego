import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormModule } from '../form/index';
import { AppBarComponent } from './appbar.component';
import { MenuComponent } from './menu.component';
import { MenuLeftItemComponent } from './menu-left-item.component';
import { MenuRightItemComponent } from './menu-right-item.component';
import { AppbarProfileComponent } from './appbar-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    RouterModule
  ],
  declarations: [
    AppBarComponent,
    MenuComponent,
    MenuLeftItemComponent,
    MenuRightItemComponent,
    AppbarProfileComponent
  ],
  exports: [
    AppBarComponent,
    MenuComponent,
    MenuLeftItemComponent,
    MenuRightItemComponent,
    AppbarProfileComponent
  ]
})
export class AppBarModule {
}
