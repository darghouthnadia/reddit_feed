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
  public items : RedditEntry[] = [];
  @Output() newItemEvent = new EventEmitter<RedditEntry[]>();

  constructor(private getRedditFeed : redditFeedService) {
    this.getRedditFeed.lastEntryId.subscribe(value => {
      this.lastId = value;
    });
   }

  ngOnInit(): void {
  }

  onNext(): void {
    this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', 25, this.lastId).subscribe(result => {
      this.items = result;
      this.newItemEvent.emit(this.items);
    })
  }

}
