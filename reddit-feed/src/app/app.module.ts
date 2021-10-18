import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RedditEntryComponent } from './reddit-entry/reddit-entry.component';

import { HttpClientModule } from '@angular/common/http';
import {redditFeedService} from './redditFeed.service'

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SearchBarComponent,
    RedditEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [redditFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
