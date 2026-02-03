import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[movieList]',
  standalone: true
})
export class ListDirective {
  constructor(private el: ElementRef) {}

  @Input() set movieList(movies: any) {
    console.log('Directive reçue:', movies);  // DEBUG
    let movieList: any[] = [];
    
    if (movies && !movies.Error) {
      // CRITIQUE : OMDB Search !
      if (movies.Search && Array.isArray(movies.Search)) {
        movieList = movies.Search;
      } else if (Array.isArray(movies)) {
        movieList = movies;
      } else {
        movieList = [movies];
      }
    }
    
    let temp = '';
    movieList.forEach((movie: any) => {
      temp += `
        <div class="list-group-item">
          <div class="row">
            <div class="col-md-3">
              <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}" 
                   onerror="this.src='https://dummyimage.com/150x200/ccc/fff&text=No+Image'">
            </div>
            <div class="col-md-9">
              <h5>${movie.Title} (${movie.Year})</h5>
              <p><strong>Réalisateur:</strong> ${movie.Director || 'N/A'}</p>
              <p>${movie.Plot?.substring(0, 100) || 'Pas de synopsis'}...</p>
            </div>
          </div>
        </div>
      `;
    });
    
    this.el.nativeElement.innerHTML = temp || '<p class="text-muted">Aucun film.</p>';
  }
}
