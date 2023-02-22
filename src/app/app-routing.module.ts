import { TaskCreateComponent } from './components/task-create/task-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories', children: [
    { path: 'create', component: CategoryAddComponent},
    { path: ':id', component: CategoryDetailsComponent},
    { path: 'edit/:id', component: CategoryEditComponent},
  ]},
  { path: 'tasks/create', component: TaskCreateComponent},
  { path: 'tasks/edit/:id', component: TaskEditComponent},
  { path: '**', redirectTo: 'categories', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [CategoriesComponent, CategoryAddComponent, CategoryDetailsComponent, CategoryEditComponent];
