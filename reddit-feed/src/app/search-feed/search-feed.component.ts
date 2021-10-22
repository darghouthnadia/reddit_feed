import { Component, OnInit } from '@angular/core';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit {

  public fetchedEntries : RedditEntry[] = [];

  fetchNewEntries(newEntries: RedditEntry[]) {
    this.fetchedEntries = newEntries;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
