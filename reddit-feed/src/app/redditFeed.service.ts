import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RedditEntry } from '../app/reddit-entry.model';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { map as rxMap, catchError} from 'rxjs/operators';
import { environment} from '../environments/environment';

@Injectable()
export class redditFeedService {
    numberOfEntries : number = 25;
    public redditDataUrl = environment.redditDataUrl;
    
    public lastEntryId = new BehaviorSubject('');
    public firstEntryId =  new BehaviorSubject('');
    public noEntriesFetched = false;

  constructor(private http: HttpClient){
  }
   
  public getFeed(n: number, redditUrl: string="Sweden",idNext? : string, idPrevious?: string): Observable<RedditEntry[]> {
    let urlAdress = this.redditDataUrl+redditUrl+".json?limit="+n;
    if(idNext) {
      urlAdress += "&after=t3_"+idNext;
    }
    if(idPrevious) {
      urlAdress += "&before=t3_"+idPrevious;
    }
    return this.http
    .get(urlAdress)
    .pipe(
      rxMap(response => response as any),
      rxMap(json => json.data.children as Array<any>),
      rxMap(children => children.map(d =>
        new RedditEntry(d.data.id, d.data.title, d.data.url, d.data.author, this.formatDate(d.data.created),d.data.num_comments, d.data.ups))),
    )
    
    
  }

  public setLastEntryId(redditFeedArray : RedditEntry[]) {
    this.lastEntryId.next(redditFeedArray[redditFeedArray.length - 1].id); 
  }

  public setFirstEntryId(redditFeedArray : RedditEntry[]) {
    this.firstEntryId.next(redditFeedArray[0].id); 
  }

  formatDate(entryDate: number): Date {
    return new Date(entryDate*1000);
  }

}