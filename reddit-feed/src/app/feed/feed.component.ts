import { Component, OnInit } from '@angular/core';
import { redditFeedService } from '../redditFeed.service'
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public redditFeed: RedditEntry[] = [];
  constructor(private getRedditFeed : redditFeedService) { }

  ngOnInit(): void {
    this.getRedditFeed.getFeed().subscribe((entry: any) => {
      this.redditFeed = entry;
    })
  }

}
