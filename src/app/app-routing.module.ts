import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { NewStoryComponent } from './pages/new-story/new-story.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { StoriesComponent } from './pages/stories/stories.component';

const routes: Routes = [
  { path: '',   component:HomeComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'post', component:NewPostComponent},
  { path: 'stories/:username', component:StoriesComponent},
  { path: 'newStory', component:NewStoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
