import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RedditEntryComponent } from './reddit-entry/reddit-entry.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { redditFeedService } from './redditFeed.service';
import { SearchFeedComponent } from './search-feed/search-feed.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SearchBarComponent,
    RedditEntryComponent,
    SearchFeedComponent,
    HeaderComponent,
    PageWrapperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [redditFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
