import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;
  errorStatusCode=null;
  errorDesc=null;
  constructor(private http: HttpClient, private postSvc: PostService) {}

  ngOnInit() {
    this.fetchPostRequest();
    this.postSvc.errorMessage.subscribe((msg)=>{
      this.isFetching = false;
      console.log("Error while inserting data :"+ msg);
    });
  }

  onCreatePost(postData: Post) {
    this.postSvc.SavePosts(postData);
    // ((response)=>{
    //   this.onFetchPosts();
    // });
    
    // Send Http request
    // console.log(postData);
    // this.http.post<{name :string}>(
    //   'https://angular-test-project-95c24-default-rtdb.firebaseio.com/posts.json',
    //   postData).
    //   subscribe((response)=>{
    //     console.log(response);
    //   })
  }

  // onCreatePost(postFormData: NgForm) {
  //   //Send Http request
  //   console.log(postFormData.value);
  // }

  onFetchPosts() {
    // Send Http request
    this.fetchPostRequest();
  }

  onClearPosts() {
    // Send Http request
    this.postSvc.DeletePosts().subscribe((result)=>{
      this.loadedPosts = [];
    });
  }

  RemoveError(){
    this.error = null;
    this.errorStatusCode=null;
    this.errorDesc=null;
  }

  private fetchPostRequest()
  {
    this.isFetching = true;
    this.postSvc.FetchPosts().subscribe((response)=>{
      this.loadedPosts = response;
      this.isFetching = false;
    },error =>{
      this.isFetching = false;
      this.error = error.message;
      this.errorStatusCode = error.status;
      this.errorDesc= error.statusText;
      console.log(error);
      console.log(error.error);
      console.log(error.statusText);
    });
    // this.isFetching = true;
    // this.http.get<{[key:string]:Post}>('https://angular-test-project-95c24-default-rtdb.firebaseio.com/posts.json')
    //   //.pipe(map((response : { [key:string]:Post} )=>{
    //     .pipe(map((response)=>{
    //     console.log(response);
    //     const retArry : Post[] = [];
    //     for(let val in response)
    //     {
    //       retArry.push({...response[val], id :val});
    //     }
    //     return retArry;
    //   }))
    //   .subscribe((response)=>{
    //     this.loadedPosts=response;
    //     this.isFetching = false;
    // })
  }
}
