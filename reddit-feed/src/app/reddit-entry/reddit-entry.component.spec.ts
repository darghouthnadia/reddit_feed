import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditEntryComponent } from './reddit-entry.component';

describe('RedditEntryComponent', () => {
  let component: RedditEntryComponent;
  let fixture: ComponentFixture<RedditEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedditEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
