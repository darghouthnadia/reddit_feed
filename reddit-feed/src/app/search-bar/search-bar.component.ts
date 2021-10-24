import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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


  constructor(private sharedDataService: dataShareService) {
    this.channel = sharedDataService.getChannel().toLowerCase();
  }

  ngOnInit(): void {
  }

  onChangeChannel() {
    this.newChannelEvent.emit(this.channel);
    this.sharedDataService.setPage(1);
  }

}
