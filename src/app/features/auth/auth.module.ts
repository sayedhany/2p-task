import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../../core/auth/auth.service';
import { AdminGuard } from '../../core/gaurds/admin.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule],
  providers: [],
})
export class AuthModule {}
