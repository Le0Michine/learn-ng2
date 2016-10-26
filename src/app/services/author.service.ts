import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/Store";
import "rxjs/add/operator/concatMap";

import { HttpHelperService } from "./http-helper.service";
import { Author } from "../models";
import { AppStore } from "../app.store";

@Injectable()
export class AuthorService {
    private headers = new Headers({"Content-Type": "application/json"});
    private authorsUrl = "/app/authors";

    constructor(private http: HttpHelperService, private store: Store<AppStore>) { }

    getAuthors(): void {
        this.http.get(this.authorsUrl, [], "get authors", (list: any[]) => list.map(x => this.toAuthorModel(x)))
            .subscribe(authors => this.store.dispatch({ type: "AUTHORS_LOADED", payload: authors }));
    }

    getById(id: number): Observable<Author> {
        let url = `${this.authorsUrl}/${id}`;
        return this.http.get(url, null, `get author with id ${id}`, x => this.toAuthorModel(x));
    }

    private toAuthorModel(json): Author {
        let result = new Author();
        result.id = json.id;
        result.name = json.name;
        return result;
    }
}