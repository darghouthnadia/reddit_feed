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
    this.buildRedditFeedAfterAction(this.selectedOption, this.channel, this.lastId, '', true)
  }

  onPrevious(): void {
    this.storageOfIds.last = this.lastId;
    this.buildRedditFeedAfterAction(Number(this.selectedOption) + 1, this.channel, '', this.firstId, false, true)
  }

  selectOption(deviceValue: any) {
    this.selectedOption = deviceValue.target.value;
    if (this.page === 1) {
      this.buildRedditFeedAfterAction(this.selectedOption, this.channel)
    }
    else {
      this.buildRedditFeedAfterAction(this.selectedOption,this.channel, this.storageOfIds.last)
    }

  }

  onChangeChannel() {
    this.page = 1;
    this.buildRedditFeedAfterAction(this.selectedOption, this.channel)
  }

  buildRedditFeedAfterAction(numberOfEntriesSelected: number, channel: string, lastId?: string, firstId?: string, next?: boolean, previous?: boolean) {
    this.getRedditFeed.getFeed(numberOfEntriesSelected, channel, lastId, firstId).subscribe(result => {
      this.items = result;
      this.getRedditFeed.currentFeed = this.items 
      this.getRedditFeed.setLastEntryId(this.items);
      this.getRedditFeed.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.newItemEvent.emit(this.items);
      if(next) {
        this.nextPage();
      }
      else if(previous) {
        this.previousPage()
      }
    },
    err => {
      this.items=[];
      this.page = 1;
      this.newItemEvent.emit([]);
    });
  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  notOnFirstPage() {
    return this.page === 1;
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
