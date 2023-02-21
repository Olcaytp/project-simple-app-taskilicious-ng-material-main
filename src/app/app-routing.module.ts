import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent, children: [
    { path: ':id', component: CategoryDetailsComponent},
    { path: 'create', component: CategoryAddComponent},
    { path: 'edit/:id', component: CategoryEditComponent},
  ]},
  { path: '**', redirectTo: 'categories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
