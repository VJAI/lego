import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListDemoComponent } from './card/card-list-demo.component';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  { path: 'demo/cardlist', component: CardListDemoComponent },
  { path: 'demo/:topic', component: DemoComponent },
  { path: 'demo', component: DemoComponent },
  { path: '', redirectTo: '/demo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
