import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  post: any;
  postId: any;

  myComment = {
    title: "",
    description: "",
    postId: ""
  };

  btnDisabled = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private apiService: RestApiService,
  ) {}

  data = this.dataService;

  ngOnInit() {
    this.activatedRoute.params.subscribe(result => {
      const postUrl = `http://localhost:4000/gloify/posts/${result["id"]}`;
      this.myComment.postId = result.id;
      this.postId = result.id;
      this.apiService
        .get(postUrl)
        .then(data => {
          data["success"]
            ? (this.post = data["post"])
            : this.router.navigate["/"];
        })
        .catch(error => this.data.error(error["message"]));
    });
  }

  refreshData() {
    this.ngOnInit();
  }

  postComment() {
    this.btnDisabled = false;
    let commentsUrl = "http://localhost:4000/gloify/comments";
    try {
      const data = this.apiService.post(commentsUrl, this.myComment);
      data["success"]
        ? this.data.success(data["message"])
        : this.data.error(data["message"]);
        this.refreshData();
    } catch (error) {
      this.data.error(error["message"]);
    }
  }

  async postUpVote() {
    const upVoteUrl = `http://localhost:4000/gloify/posts/${this.postId}/upvote`;
    try {
      const data = await this.apiService.put(upVoteUrl, {});
      data["success"]
      ? (this.dataService.success("Post Upvoted !!!"))
      : this.dataService.error("Couldn't UpVote");
      this.post.upvotes += 1;
    } catch (error) {
      this.dataService.error(error["message"]);
    }
  }

  async postDownVote() {
    const downVoteUrl = `http://localhost:4000/gloify/posts/${this.postId}/downvote`;
    try {
      const data = await this.apiService.put(downVoteUrl, {});
      data["success"]
      ? (this.dataService.success("Post Downvoted !!!"))
      : this.dataService.error("Couldn't DownVote");
      this.post.upvotes -= 1;
    } catch (error) {
      this.dataService.error(error["message"]);
    }
  }

  async commentUpVote(id) {
    const downVoteUrl = `http://localhost:4000/gloify/comments/${id}/upvote`;
    try {
      const data = await this.apiService.put(downVoteUrl, {});
      data["success"]
      ? (this.dataService.success("Comment Upvoted !!!"))
      : this.dataService.error("Couldn't UpVote");
      this.post.comments.upvotes += 1;
      this.refreshData();
    } catch (error) {
      this.dataService.error(error["message"]);
    }
  }

  async commentDownVote(id) {
    const downVoteUrl = `http://localhost:4000/gloify/comments/${id}/downvote`;
    try {
      const data = await this.apiService.put(downVoteUrl, {});
      data["success"]
      ? (this.dataService.success("Comment DownVoted !!!"))
      : this.dataService.error("Couldn't DownVote");
      this.post.upvotes -= 1;
      this.refreshData();
    } catch (error) {
      this.dataService.error(error["message"]);
    }
  }

}
