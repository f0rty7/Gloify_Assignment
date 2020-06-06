import { MyPostsComponent } from './Post/my-posts/my-posts.component';
import { SettingsComponent } from './settings/settings.component';
import { NewPostComponent } from './Post/new-post/new-post.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsComponent } from './Post/posts/posts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'post/:id',
    component: PostsComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'profile/newpost',
    component: NewPostComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'profile/myposts',
    component: MyPostsComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path:'**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
