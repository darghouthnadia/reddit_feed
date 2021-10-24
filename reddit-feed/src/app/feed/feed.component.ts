import { Component, OnInit } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
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
  private selectedOption: number = 10;
  public items: RedditEntry[] = [];

  constructor(private redditFeedService: redditFeedService, private sharedDataService: dataShareService) { }

  ngOnInit(): void {
    this.redditFeedService.getFeed(10, this.sharedDataService.getChannel()).subscribe((entry: any) => {
      this.items = entry;
      this.redditFeedService.setLastEntryId(this.items);
      this.redditFeedService.setFirstEntryId(this.items);
      this.redditFeedService.currentFeed = this.items;
      this.refreshLastAndFirstId()
    })
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
      this.buildRedditFeedAfterAction(this.selectedOption, this.channel, this.storageOfIds.last)
    }
  }

  buildRedditFeedAfterAction(numberOfEntriesSelected: number, channel: string, lastId?: string, firstId?: string, next?: boolean, previous?: boolean) {
    this.redditFeedService.getFeed(numberOfEntriesSelected, channel, lastId, firstId).subscribe(result => {
      this.items = result;
      this.redditFeedService.currentFeed = this.items
      this.redditFeedService.setLastEntryId(this.items);
      this.redditFeedService.setFirstEntryId(this.items);
      this.refreshLastAndFirstId();
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
