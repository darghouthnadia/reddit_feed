import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchFeedComponent } from '../app/search-feed/search-feed.component';
import { RedditEntryComponent } from '../app/reddit-entry/reddit-entry.component';

const routes: Routes = [
  { path: 'feed', component: SearchFeedComponent },
  { path: 'entry/:id', component: RedditEntryComponent },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }