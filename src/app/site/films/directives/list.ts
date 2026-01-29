import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[movieList]',
  standalone: true  // ← AJOUT Angular 21
})
export class ListDirective {
  constructor(private el: ElementRef) {}

  @Input() set movieList(movies: any) {  // ← @Input AVANT la méthode
    if (movies && !movies.Error) {
      let temp = '';
      const movieList = Array.isArray(movies) ? movies : [movies];
      
      movieList.forEach((movie: any) => {
        temp += `
          <div class="list-group-item">
            <div class="row">
              <div class="col-md-3">
                <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}" 
                onerror="this.src='https://dummyimage.com/150x200/ccc/fff.png&text=No+Image'">
              </div>
              <div class="col-md-9">
                <h5>${movie.Title} (${movie.Year})</h5>
                <p><strong>Réalisateur:</strong> ${movie.Director}</p>
                <p>${movie.Plot?.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        `;
      });
      this.el.nativeElement.innerHTML = temp;
    }
  }
}
