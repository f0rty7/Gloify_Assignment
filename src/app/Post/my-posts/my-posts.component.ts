import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  posts: any;

  constructor(
    private apiService: RestApiService,
    private dataService: DataService
  ) {}

  data = this.dataService;

  async ngOnInit() {
    let productsUrl = "http://localhost:4000/gloify/posts";
    try {
      const data = await this.apiService.get(productsUrl);
      console.log("My Posts", data);
      data["message"]
        ? (this.posts = data["posts"])
        : this.data.error(data["message"]);
    } catch (error) {
      this.dataService.error(error["message"]);
    }
  }
}
