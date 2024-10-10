import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppModule } from '../../app.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AppModule],
})
export class HomeModule {}
