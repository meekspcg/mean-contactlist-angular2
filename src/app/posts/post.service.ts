import { Injectable } from "@angular/core";
import { post } from "./post";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class postService {
  private postsUrl = "/api/posts";

  constructor(private http: Http) {}

  // get("/api/posts")
  getposts(): Promise<post[]> {
    return this.http
      .get('https://testcontactsappcc.herokuapp.com/posts.json')
      .toPromise()
      .then(response => response.json() as post[])
      .catch(this.handleError);
  }

  // post("/api/posts")
  createpost(newpost: post): Promise<post> {
    return this.http
      .post(this.postsUrl, newpost)
      .toPromise()
      .then(response => response.json() as post)
      .catch(this.handleError);
  }

  // get("/api/posts/:id") endpoint not used by Angular app

  // delete("/api/posts/:id")
  deletepost(delpostId: String): Promise<String> {
    return this.http
      .delete(this.postsUrl + "/" + delpostId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/posts/:id")
  updatepost(putpost: post): Promise<post> {
    var putUrl = this.postsUrl + "/" + putpost._id;
    return this.http
      .put(putUrl, putpost)
      .toPromise()
      .then(response => response.json() as post)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    let errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg); // log to console
    return Promise.reject(errMsg);
  }
}
