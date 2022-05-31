import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AddPostService} from "../add-post.service";
import {PostPayload} from "../add-post/post-payload";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // @ts-ignore
  permalink : number;
  // @ts-ignore
  post: PostPayload;
  constructor(private router : ActivatedRoute,private postService : AddPostService) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      params =>{
        this.permalink =params['id'];
      }

    );
    this.postService.getPost(this.permalink).subscribe((data:PostPayload) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }

}
