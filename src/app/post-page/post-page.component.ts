import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  posts$: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(param => this.id = param.id)
    // this.postService.getById(this.id).subscribe(post => this.post = post)
    this.posts$ =  this.route.params
      .pipe(switchMap(
        (params: Params) => {
          return this.postService.getById(params['id'])
        }
      ))
  }
}
