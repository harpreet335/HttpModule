import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn:'root' })
export class PostService{
    constructor(private http : HttpClient){
    }
    errorMessage = new Subject<string>();

    SavePosts(postData : Post)
    {
        console.log(postData);
        return this.http.post<{name :string}>(
          'https://angular-test-project-95c24-default-rtdb.firebaseio.com/posts.json',
          postData,
          { 
            observe: 'response'
          }).subscribe(
            (response)=> {
              console.log(response);
              console.log(response.status);
            },
          (error)=>{
            this.errorMessage.next(error);
          });
    }

    DeletePosts() : Observable<any>{
      return this.http.delete("https://angular-test-project-95c24-default-rtdb.firebaseio.com/posts.json",
      {
        observe:'events'
      }).pipe(
        tap((event)=>
        {
          console.log(event);
          if(event.type === HttpEventType.Sent)
          {
            console.log('Inside event sent of Delete funciton');
            console.log(event.body);
          }
          if(event.type === HttpEventType.Response)
          {
            console.log('Inside Response block of code');
            console.log(event.body);
            console.log(event.status);
          }
        }));
    }

    FetchPosts() : Observable<any> {
        //this.isFetching = true;
        //postObs : new Observable();
        let params = new HttpParams();
        params = params.append('print','pretty');
        params = params.append('test','demo');

        let postObs = this.http.get<{[key:string]:Post}>('https://angular-test-project-95c24-default-rtdb.firebaseio.com/posts.json',
        { 
          headers:new HttpHeaders({ "TestHeader":"TestValue", "TestHeader2":"TestValue2" }),
          params : params })
            .pipe(map((response)=>{
            console.log(response);
            const retArry : Post[] = [];
            for(let val in response)
            {
              retArry.push({...response[val], id :val});
            }
            return retArry;
          }), catchError((errorMsg)=>{
             return throwError(errorMsg);
          }));

        return postObs;
    }
}