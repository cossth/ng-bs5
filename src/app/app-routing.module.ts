import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './examples/carousel/carousel.component';
import { ListExamplesComponent } from './list-examples/list-examples.component';

const routes: Routes = [
  { path: 'carousel', component: CarouselComponent },
  { path: '**', component: ListExamplesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
