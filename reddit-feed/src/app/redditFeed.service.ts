import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RedditEntry } from '../app/reddit-entry.model';
import { BehaviorSubject  } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

@Injectable()
export class redditFeedService {
    numberOfEntries : number = 25;
    
    public lastEntryId = new BehaviorSubject('');
    public firstEntryId =  new BehaviorSubject('');

  constructor(private http: HttpClient){
  }
   
  public getFeed(redditUrl: string, n: number, idNext? : string, idPrevious?: string, lastId?: string) {
    let urlAdress = redditUrl+"?limit="+n;
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
        new RedditEntry(d.data.id, d.data.title, d.data.url, d.data.author, d.data.created,d.data.num_comments, d.data.ups)))
    );
    
  }

  public setLastEntryId(redditFeedArray : RedditEntry[]) {
    this.lastEntryId.next(redditFeedArray[redditFeedArray.length - 1].id); 
  }

  public setFirstEntryId(redditFeedArray : RedditEntry[]) {
    this.firstEntryId.next(redditFeedArray[0].id); 
  }

}