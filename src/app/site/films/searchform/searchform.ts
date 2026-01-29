import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Searchmovie } from '../services/searchmovie';
import { FormValidators } from '../form-validators';
import { ListDirective } from '../directives/list';

@Component({
  selector: 'app-searchform',
  imports: [ReactiveFormsModule, FormsModule, ListDirective],
  templateUrl: './searchform.html',
  styleUrl: './searchform.css',
})
export class Searchform implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl({});
  year: FormControl = new FormControl({});

  results: any;
  errors: string = "";

  constructor(private fb: FormBuilder,private searchMovie: Searchmovie,private cdr:ChangeDetectorRef) { }
  
  
  ngOnInit() {
    let titlePattern = /^[a-zA-Z0-9\s,\\.]+$/;
    let yearPattern = /^\d{4}$/;
    this.title = this.fb.control(
      '', [Validators.required, Validators.maxLength(30), Validators.pattern(titlePattern)]
    );
    this.year = this.fb.control(
      '2018', [Validators.pattern(yearPattern), FormValidators.integerBetween(1900, 2022)]
    );
    this.searchForm = this.fb.group({
      title: this.title,
      year: this.year
    });
  }
  startSearch() {
    let title = this.title.valid ? this.title.value : null;
    let year = this.year.valid ? this.year.value : null;
    let that = this;
    /* référence vers l'objet courant : à cause de la portée des variables 
    dans les Arrow fucntions et les fin de bloc {} (closures)
    */
    let action = (data: any) => {
      if (data['Error']) {
        that.errors = data['Error'];
        that.results = '';
        this.cdr.detectChanges();
      }
      else {
        that.errors = '';
        that.results = data;
        this.cdr.detectChanges();
      }
    }
    if (title)
      this.searchMovie.search(action, title, year);
    else
      this.errors = 'Titre non obligatoire !';
  }
}