import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RedditEntryComponent } from './reddit-entry/reddit-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SearchBarComponent,
    RedditEntryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
