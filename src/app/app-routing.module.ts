import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './pages/home/home.module';
import { LoginComponent } from './pages/login/login.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TestComponent } from './pages/test/test.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'test', component: TestComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'create-activity', component: CreateActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
