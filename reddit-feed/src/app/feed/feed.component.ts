import { Component, Input, OnInit } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css', '../app.component.css']
})
export class FeedComponent implements OnInit {
  
  @Input() fetchedPageRedditFeed: RedditEntry[] = [];

  constructor(private redditFeedService : redditFeedService) { }

  ngOnInit(): void {
    this.redditFeedService.getFeed(10, 'sweden').subscribe((entry: any) => {
      this.fetchedPageRedditFeed = entry;
      this.redditFeedService.setLastEntryId(this.fetchedPageRedditFeed);
      this.redditFeedService.setFirstEntryId(this.fetchedPageRedditFeed);
      this.redditFeedService.currentFeed = this.fetchedPageRedditFeed;
    })
  }
}
