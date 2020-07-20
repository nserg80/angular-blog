import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit,  OnDestroy {

  posts: Post[] = []
  postsSubscription: Subscription
  deleteSubscription: Subscription
  searchStr = ''

  constructor(private postService: PostService) { }
  
  ngOnInit() {
    this.postsSubscription = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    }) 
  }
  remove(id:string) {
    this.deleteSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }
  ngOnDestroy() {
    if(this.postsSubscription) {
      this.postsSubscription.unsubscribe()
    }
    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe()
    }
  }
}
