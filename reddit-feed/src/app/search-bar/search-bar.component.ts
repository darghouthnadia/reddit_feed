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
  public firstLoad: boolean = false;
  @Output() newItemEvent = new EventEmitter<RedditEntry[]>();

  constructor(private getRedditFeed : redditFeedService) {
    this.getRedditFeed.lastEntryId.subscribe(value => {
      this.lastId = value;
    });
   }

  ngOnInit(): void {
    this.firstLoad = true;
  }

  onNext(): void {
    this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', 25, this.lastId).subscribe(result => {
      this.items = result;
      this.firstLoad = false;
      this.newItemEvent.emit(this.items);
    })
  }

}
