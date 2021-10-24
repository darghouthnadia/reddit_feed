import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { redditFeedService } from '../redditFeed.service';
import { RedditEntry } from '../reddit-entry.model';
import { dataShareService } from '../data-shared.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css', '../app.component.css']
})
export class SearchBarComponent implements OnInit {

  public items: RedditEntry[] = [];
  public channel = '';
 
  public page: number = 1;
  @Output() newChannelEvent = new EventEmitter<string>();


  constructor(private redditFeedService: redditFeedService, sharedDataService: dataShareService) {
    this.channel = sharedDataService.getChannel();
  }

  ngOnInit(): void {
  }


  onChangeChannel() {
    this.newChannelEvent.emit(this.channel);
  }

  buildRedditFeedAfterAction(numberOfEntriesSelected: number, channel: string, lastId?: string, firstId?: string, next?: boolean, previous?: boolean) {
    this.redditFeedService.getFeed(numberOfEntriesSelected, channel, lastId, firstId).subscribe(result => {
      this.items = result;
      this.redditFeedService.currentFeed = this.items 
      this.redditFeedService.setLastEntryId(this.items);
      this.redditFeedService.setFirstEntryId(this.items);
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

}
