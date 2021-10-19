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
  storageOfIds = {last:'', first:''};
  public items: RedditEntry[] = [];
  selectedOption: number = 25;
  page: number = 1;
  @Output() newItemEvent = new EventEmitter<RedditEntry[]>();

  constructor(private getRedditFeed: redditFeedService) {
    this.refreshLastAndFirstId();
  }

  ngOnInit(): void {
  }

  onNext(): void {
    this.storageOfIds.last = this.lastId;
    this.storageOfIds.first = this.firstId;
    this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', this.selectedOption, this.lastId).subscribe(result => {
      this.items = result;
      this.getRedditFeed.setLastEntryId(this.items);
      this.getRedditFeed.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.newItemEvent.emit(this.items);
      this.page += 1;
    });
  }

  onPrevious(): void {
    this.storageOfIds.last = this.lastId;
    this.storageOfIds.first = this.firstId;
    this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', this.selectedOption, undefined, this.firstId).subscribe(result => {
      this.items = result;
      this.getRedditFeed.setLastEntryId(this.items);
      this.getRedditFeed.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.newItemEvent.emit(this.items);
      this.page -= 1;
    });
  }

  refreshLastAndFirstId() {
    this.getRedditFeed.lastEntryId.subscribe(value => {
      this.lastId = value;
      console.log('last', value);
    });
    this.getRedditFeed.firstEntryId.subscribe(value => {
      this.firstId = value;
      console.log('first', value);
    });
  }

  notOnFirstPage() {
    return this.page === 1;
  }

  selectOption(deviceValue: any) {
    this.selectedOption = deviceValue.target.value;
    if (this.page === 1) {
      this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', this.selectedOption).subscribe(result => {
        this.items = result;
        this.getRedditFeed.setLastEntryId(this.items);
        this.getRedditFeed.setFirstEntryId(this.items);
        this.refreshLastAndFirstId();
        this.newItemEvent.emit(this.items);
      });
    }
    else {
      this.getRedditFeed.getFeed('http://www.reddit.com/r/sweden.json', this.selectedOption, this.storageOfIds.last).subscribe(result => {
        this.items = result;
        this.getRedditFeed.setLastEntryId(this.items);
        this.getRedditFeed.setFirstEntryId(this.items);
        this.refreshLastAndFirstId();
        this.newItemEvent.emit(this.items);
      });
    }

  }



}
