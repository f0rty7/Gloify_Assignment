import { AuthGaurdService } from './auth-gaurd.service';
import { DataService } from './data.service';
import { RestApiService } from './rest-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './Post/posts/posts.component';
import { NewPostComponent } from './Post/new-post/new-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { MyPostsComponent } from './Post/my-posts/my-posts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MessageComponent,
    ProfileComponent,
    PostsComponent,
    NewPostComponent,
    PageNotFoundComponent,
    HomeComponent,
    SettingsComponent,
    MyPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    RestApiService,
    DataService,
    AuthGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
