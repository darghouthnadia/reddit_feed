import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { dataShareService } from '../data-shared.service';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css', '../app.component.css']
})
export class SearchFeedComponent implements OnInit {

  @ViewChild(FeedComponent) feed: FeedComponent | undefined;
  
  constructor(private shareDataService: dataShareService) { }

  sendNewChannel(newChannel: string) {
    this.feed?.buildRedditFeedAfterAction(this.shareDataService.getNumberOfEntriesPerPage(), newChannel);
    this.shareDataService.setPage(1);
    this.shareDataService.setChannel(newChannel);
    this.feed?.setChannel(newChannel);
  }
  ngOnInit(): void {
  }

}
