import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  imports: [
    CommonModule,
    LoadingBarModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule {
}
