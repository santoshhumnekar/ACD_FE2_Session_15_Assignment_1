import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**************************************************************************************************
 Wikipedia offers a modern CORS API and a legacy JSONP search API.
 This example uses the latter.
 The Angular Jsonp service both extends the Http service for JSONP and restricts you to GET requests.
 All other HTTP methods throw an error because JSONP is a read-only facility.
 ***************************************************************************************************/

@Injectable()
export class WikiService {
  times: number;
  constructor(private http: Http, private jsonp: Jsonp) {
    this.times = 0;
  }
  
  searchWiki(searchItem: string) {
    let url = 'http://en.wikipedia.org/w/api.php'  
    let params = new URLSearchParams()      
    params.set('search', searchItem)
    params.set('action', 'opensearch')
    params.set('format', 'json')
    //params.set('callback', 'JSONP_CALLBACK')
    params.set('callback', `__ng_jsonp__.__req${this.times}.finished`);
    this.times = this.times + 1;
    // The get() takes two arguments: the wikiUrl and an options object
    // whose search property is the params object.
    //Jsonp flattens the params object into a query string
    //Using Promises

    return this.jsonp.get(url, {search: params}).toPromise()
      .then(function (response) {
        return response.json()[1];
      })
      .catch(function (error) {
        return error;
      })
  }
}
