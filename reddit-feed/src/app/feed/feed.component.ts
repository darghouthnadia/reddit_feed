import { Component, Input, OnInit } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  
  @Input() fetchedPageRedditFeed: RedditEntry[] = [];

  constructor(private getRedditFeed : redditFeedService) { }

  ngOnInit(): void {
    this.getRedditFeed.getFeed(25, 'sweden').subscribe((entry: any) => {
      this.fetchedPageRedditFeed = entry;
      this.getRedditFeed.setLastEntryId(this.fetchedPageRedditFeed);
      this.getRedditFeed.setFirstEntryId(this.fetchedPageRedditFeed);
    })
  }
}
