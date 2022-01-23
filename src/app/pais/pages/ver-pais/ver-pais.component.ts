import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;


  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    // Tambien es usable-----------------
    // this.activateRoute.params.subscribe(({ id }) => {
    //   this.paisService.getPaisPorAlpha(id).subscribe( pais =>{
    //   })
    // })
    // usando rxjs-----------------------
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log)
      ).subscribe(pais => {
        console.log('Pais cl ', pais[0] );
        this.pais =  pais[0] ;
        console.log('this.pais ', this.pais );
      })
  }

}
