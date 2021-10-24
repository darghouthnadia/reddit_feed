import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css', '../app.component.css']
})
export class SearchBarComponent implements OnInit {

  private lastId = '';
  private firstId = '';
  public items: RedditEntry[] = [];
  public channel = 'sweden';
  private storageOfIds = {last:'', first:''};
 
  private selectedOption: number = 25;
  public page: number = 1;
  @Output() refreshFeedEvent = new EventEmitter<RedditEntry[]>();

  constructor(private redditFeedService: redditFeedService) {
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
    this.redditFeedService.getFeed(numberOfEntriesSelected, channel, lastId, firstId).subscribe(result => {
      this.items = result;
      this.redditFeedService.currentFeed = this.items 
      this.redditFeedService.setLastEntryId(this.items);
      this.redditFeedService.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.refreshFeedEvent.emit(this.items);
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
      this.refreshFeedEvent.emit([]);
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
    this.redditFeedService.lastEntryId.subscribe(value => {
      this.lastId = value;
    });
    this.redditFeedService.firstEntryId.subscribe(value => {
      this.firstId = value;
    });
  }
}
