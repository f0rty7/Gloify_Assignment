import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit{
  post = {
    title: '',
    image: '',
    description: '',
  };

  btnDisabled = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private apiService: RestApiService
  ) {}

  data = this.dataService;

  ngOnInit(): void {}

  async createPost() {
    this.btnDisabled = true;
    try {
      if (this.post) {
        let postProductUrl = 'http://localhost:4000/gloify/posts';
        const data = await this.apiService.post(postProductUrl, this.post);
        data['success']
          ? this.router
              .navigate(['/'])
              .then(() => this.data.success(data['message']))
              .catch(() => this.data.error(data['message']))
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
