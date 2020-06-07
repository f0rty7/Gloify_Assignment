import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any;

  constructor(
    private dataService: DataService,
    private apiService: RestApiService
  ) {}

  data = this.dataService;

  async ngOnInit() {
    let postsUrl = "http://localhost:4000/gloify/posts";
    try {
      const data = await this.apiService.get(postsUrl);
      data["success"]
        ? (this.posts = data["posts"])
        : this.data.error("Could not fetch products");
    } catch (error) {
      this.data.error(error["message"]);
    }
  }

}
