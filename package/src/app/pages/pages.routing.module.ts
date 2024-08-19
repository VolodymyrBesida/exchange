import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppConvertionComponent } from './convertion/convertion.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: AppDashboardComponent
      },
      {
        path: 'convertion',
        component: AppConvertionComponent,
      }

    ]
  },
  
  
];
