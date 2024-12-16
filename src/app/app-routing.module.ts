import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './pages/home/home.module';
import { LoginComponent } from './pages/login/login.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { TestComponent } from './pages/test/test.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';
import { DemandeDevisComponent } from './pages/demande-devis/demande-devis.component';
import { DemandeDevisModule } from './pages/demande-devis/demande-devis.module';
import { adminGuardGuard } from './guard/admin-guard.guard';
import { CreateActivityTypePageComponent } from './pages/create-activity-type-page/create-activity-type-page.component';
import { CreateLocationComponent } from './pages/create-location/create-location.component';
import { PayementComponent } from './pages/payement/payement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'test', component: TestComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'payement',component: PayementComponent},
  {
    path: 'create-activity-type',
    component: CreateActivityTypePageComponent,
    canActivate: [adminGuardGuard],
  },
  {
    path: 'create-location',
    component: CreateLocationComponent,
    canActivate: [adminGuardGuard],
  },
  {
    path: 'create-activity',
    canActivate: [adminGuardGuard],
    component: CreateActivityComponent,
  },
  { path: 'demande-devis', component: DemandeDevisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
