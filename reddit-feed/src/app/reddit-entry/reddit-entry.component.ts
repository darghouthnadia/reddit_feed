import { Component, OnInit, Input } from '@angular/core';
import { RedditEntry } from '../reddit-entry.model';

@Component({
  selector: 'app-reddit-entry',
  templateUrl: './reddit-entry.component.html',
  styleUrls: ['./reddit-entry.component.css']
})
export class RedditEntryComponent implements OnInit {

  @Input() entry: RedditEntry | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
