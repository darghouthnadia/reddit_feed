import { Component, Input, OnInit } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
import { RedditEntry } from '../reddit-entry.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  

  public initialRedditFeed: RedditEntry[] = [];
  @Input() fetchedPageRedditFeed: RedditEntry[] = [];

  public redditUrl = environment.redditDataUrl;
  constructor(private getRedditFeed : redditFeedService) { }

  ngOnInit(): void {
    this.getRedditFeed.getFeed(this.redditUrl, 25).subscribe((entry: any) => {
      this.initialRedditFeed = entry;
      this.getRedditFeed.getLastEntryId().next(this.getLastEntryId(this.initialRedditFeed));
      this.getRedditFeed.getLastEntryId().subscribe(console.log);
    })
   
  }

  getLastEntryId(redditFeedArray : RedditEntry[]): string {
    return redditFeedArray[redditFeedArray.length - 1].id;
  }

}
