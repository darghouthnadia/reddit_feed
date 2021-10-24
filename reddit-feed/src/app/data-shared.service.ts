import { Injectable } from '@angular/core';

@Injectable()
export class dataShareService {
    private page : number = 1;
    private channel: string = "sweden";
    private numberOfEntriesPerPage: number = 5;
    constructor() { }
    public setPage(p : number) { this.page = p; }
    public getPage() : number { return this.page; }
    public setChannel(c : string) { this.channel = c; }
    public getChannel() : string { return this.channel; }
    public setNumberOfEntriesPerPage(nep: number) { this.numberOfEntriesPerPage = nep; }
    public getNumberOfEntriesPerPage() : number { return this.numberOfEntriesPerPage; }
}