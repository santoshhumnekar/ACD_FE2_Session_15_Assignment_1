import { Component } from '@angular/core';
import { WikiService } from './wiki.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WikiService ]
})
export class AppComponent {
  title: string = "Wikipedia API "

  constructor( public wikiService: WikiService){
    this.searchUniversity();
    this.searchCompanys();
      }

  items: string[];
  companys: string[];

  //returns an array of string results
  //to be rendered in a table

  searchUniversity(){
    this.wikiService.searchWiki("University").then(
      response => this.items = response,
      error => console.log(error)
    )
  }

  searchCompanys() {
    this.wikiService.searchWiki("Company").then(
    response => this.companys = response,
      error => console.log(error)
    )
  }
}
   