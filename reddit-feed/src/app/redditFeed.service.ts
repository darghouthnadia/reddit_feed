import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RedditEntry } from '../app/reddit-entry.model';
import { Observable, Subject } from 'rxjs';
import { map as rxMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class redditFeedService {
    redditEntries$: Observable<RedditEntry[]> | undefined;
    public redditUrl = environment.redditDataUrl;
    
  constructor(private http: HttpClient){
  }
   
  

  public getFeed() {
    this.redditEntries$ = this.http
    .get(this.redditUrl)
    .pipe(
      rxMap(response => response as any),
      rxMap(json => json.data.children as Array<any>),
      rxMap(children => children.map(d =>
        new RedditEntry(d.data.id, d.data.title, d.data.url, d.data.author, d.data.created,d.data.num_comments, d.data.ups)))
    );
    return this.redditEntries$;
  }

}