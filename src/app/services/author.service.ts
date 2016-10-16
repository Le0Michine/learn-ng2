import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Operator/concatMap";

import { Author } from "../models";

@Injectable()
export class AuthorService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private authorsUrl = "/app/authors";

    constructor(private http: Http) { }

    getAuthors(): Observable<Author[]> {
        return this.http.get(this.authorsUrl).map(response => response.json().data as Author[]);
    }

    getById(id: number): Observable<Author> {
        let url = `${this.authorsUrl}/${id}`;
        return this.http.get(url).map(response => response.json().data);
    }
}