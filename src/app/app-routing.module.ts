import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouteGuard } from './route-guard.guard';
import { SingleVideoComponent } from './single-video/single-video.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: 'videos/:id', component: SingleVideoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'upload', component: UploadPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: 'search/:term', component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
