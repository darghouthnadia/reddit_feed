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
  public items: RedditEntry[] = [];
  channel = 'sweden';
  storageOfIds = {last:'', first:''};
 
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
    this.getRedditFeed.getFeed(this.selectedOption, this.channel, this.lastId).subscribe(result => {
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
    this.getRedditFeed.getFeed( Number(this.selectedOption) + 1,this.channel, undefined, this.firstId).subscribe(result => {
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
      this.getRedditFeed.getFeed(this.selectedOption, this.channel).subscribe(result => {
        this.items = result;
        this.getRedditFeed.setLastEntryId(this.items);
        this.getRedditFeed.setFirstEntryId(this.items);
        this.refreshLastAndFirstId();
        this.newItemEvent.emit(this.items);
      },
      err => console.log('HTTP Error', err));
    }
    else {
      this.getRedditFeed.getFeed(this.selectedOption,this.channel, this.storageOfIds.last).subscribe(result => {
        this.items = result;
        this.getRedditFeed.setLastEntryId(this.items);
        this.getRedditFeed.setFirstEntryId(this.items);
        this.refreshLastAndFirstId();
        this.newItemEvent.emit(this.items);
      });
    }

  }

  onChangeChannel() {
    this.page = 1;
    this.getRedditFeed.getFeed(this.selectedOption, this.channel).subscribe(result => {
      this.items = result;
      this.getRedditFeed.setLastEntryId(this.items);
      this.getRedditFeed.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.newItemEvent.emit(this.items);
    },
    err => {
      this.items=[];
      this.page = 1;
      this.newItemEvent.emit([]);
    });
  }



}
