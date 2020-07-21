import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  submitted = false
  updateSubsription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
      this.post = post
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
    this.submitted = true
    
    this.updateSubsription = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false
      this.alertService.success('Post was updated')
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

  ngOnDestroy() {
    if(this.updateSubsription) {
      this.updateSubsription.unsubscribe()
    }
  }
}
