import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export @Injectable({
  providedIn: 'root',
})
class Searchmovie {
constructor(private http:HttpClient) { }
search(action:any,title:string,year:number=0) : void {
let results ={};
let y = year? `&y=${year}`:'';
this.http.get(`http://www.omdbapi.com/?apikey=b267f2ad&t=${title}${y}&plot=full`).
subscribe(
(response) =>{
action(response);
}
)
}
}