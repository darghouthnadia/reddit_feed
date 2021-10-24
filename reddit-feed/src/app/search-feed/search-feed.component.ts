import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit {

  @ViewChild(FeedComponent) feed: FeedComponent | undefined;

  sendNewChannel(newChannel: string) {
    this.feed?.buildRedditFeedAfterAction(10, newChannel)
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
