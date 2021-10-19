import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public lastId = '';
  public firstId = '';
  public items : RedditEntry[] = [];
  public firstLoad: boolean = false;
  @Output() newItemEvent = new EventEmitter<RedditEntry[]>();

  constructor(private getRedditFeed : redditFeedService) {
    this.refreshLastAndFirstId();
   }

  ngOnInit(): void {
    this.firstLoad = true;
  }

  onNext(): void {
    this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', 25, this.lastId).subscribe(result => {
      this.items = result;
      this.firstLoad = false;
      this.getRedditFeed.setLastEntryId(this.items);
      this.getRedditFeed.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.newItemEvent.emit(this.items);
    })
  }

  onPrevious(): void {
    this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', 25, undefined, this.firstId).subscribe(result => {
      this.items = result;
      this.getRedditFeed.setLastEntryId(this.items);
      this.getRedditFeed.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.firstLoad = false;
      this.newItemEvent.emit(this.items);
    })
  }

  refreshLastAndFirstId() {
    this.getRedditFeed.lastEntryId.subscribe(value => {
      this.lastId = value;
    });
    this.getRedditFeed.firstEntryId.subscribe(value => {
      this.firstId = value;
    });
  }


}
