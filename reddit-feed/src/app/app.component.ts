import { Component } from '@angular/core';
import { RedditEntry } from './reddit-entry.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reddit-feed';

  public fetchedEntries : RedditEntry[] = [];

  fetchNewEntries(newEntries: RedditEntry[]) {
    this.fetchedEntries = newEntries;
    
  }
}
