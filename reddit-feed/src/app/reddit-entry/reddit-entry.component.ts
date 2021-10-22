import { Component, OnInit, Input } from '@angular/core';
import { RedditEntry } from '../reddit-entry.model';
import { Router, ActivatedRoute } from '@angular/router';
import { redditFeedService } from '../redditFeed.service';

@Component({
  selector: 'app-reddit-entry',
  templateUrl: './reddit-entry.component.html',
  styleUrls: ['./reddit-entry.component.css']
})
export class RedditEntryComponent implements OnInit {

  @Input() entry: RedditEntry | undefined;
  passedItem : RedditEntry | undefined;
  constructor( private router: Router, private route: ActivatedRoute, private getRedditFeed : redditFeedService) {
    let id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.passedItem = this.getRedditFeed.getEntry(id);
    }
   }

  ngOnInit(): void {
    (!this.passedItem) ? this.router.navigate(['/']) : this.entry =this.passedItem;
     
  }

}
