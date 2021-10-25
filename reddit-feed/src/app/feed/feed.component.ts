import { Component, OnInit } from '@angular/core';
import { redditFeedService } from '../reddit-feed.service';
import { dataShareService } from '../data-shared.service';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css', '../app.component.css']
})
export class FeedComponent implements OnInit {

  public page: number = 1;
  private storageOfIds = { last: '', first: '' };
  private lastId: string = '';
  private firstId: string = '';
  public channel: string = 'sweden';
  public optionList = [5, 10, 25]
  public items: RedditEntry[] = [];
  public selectedOption = 0;

  constructor(private redditFeedService: redditFeedService, private sharedDataService: dataShareService) {
    this.selectedOption = this.sharedDataService.getNumberOfEntriesPerPage();
   }

  ngOnInit(): void {
    this.buildRedditFeedAfterAction(this.sharedDataService.getNumberOfEntriesPerPage(), this.sharedDataService.getChannel());
  }

  onNext(): void {
    this.storageOfIds.last = this.lastId;
    this.buildRedditFeedAfterAction(this.selectedOption, this.channel, this.lastId, '', true)
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  setChannel(channel: string) {
    this.channel = channel;
  } 

  onPrevious(): void {
    this.storageOfIds.last = this.lastId;
    this.buildRedditFeedAfterAction(Number(this.selectedOption) + 1, this.channel, '', this.firstId, false, true)
  }

  selectOption(deviceValue: any) {
    this.selectedOption = deviceValue.target.value;
    this.sharedDataService.setNumberOfEntriesPerPage(this.selectedOption);
    if (this.page === 1) {
      this.buildRedditFeedAfterAction(this.selectedOption, this.channel)
    }
    else {
      this.buildRedditFeedAfterAction(this.selectedOption, this.channel, this.storageOfIds.last)
    }
  }

  nextPage() {
    this.page += 1;
    this.sharedDataService.setPage(this.page);
  }

  previousPage() {
    this.page -= 1;
    this.sharedDataService.setPage(this.page);
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

  buildRedditFeedAfterAction(numberOfEntriesSelected: number, channel: string, lastId?: string, firstId?: string, next?: boolean, previous?: boolean) {
    this.redditFeedService.getFeed(numberOfEntriesSelected, channel, lastId, firstId).subscribe(result => {
      this.items = result;
      this.redditFeedService.currentFeed = this.items
      this.redditFeedService.setLastEntryId(this.items);
      this.redditFeedService.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
      this.page = this.sharedDataService.getPage()
      if (next) {
        this.nextPage();
      }
      else if (previous) {
        this.previousPage()
      }
    },
      err => {
        this.items = [];
        this.page = 1;
      });
  }
}
