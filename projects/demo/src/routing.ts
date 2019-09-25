import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListDemoComponent } from './card/card-list-demo.component';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  { path: 'cardlist', component: CardListDemoComponent },
  { path: ':topic', component: DemoComponent },
  { path: '', component: DemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
