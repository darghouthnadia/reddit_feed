export class RedditEntry {
    constructor(
      public id: string,
      public title: string,
      public url: string,
      public author: string = "",
      public created: Date,
      public num_comments: number = 1,
      public score: number = 1,
      public thumbnail: any = null
     
    ) {
    }
  }