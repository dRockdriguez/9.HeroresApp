import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  private heroes:Heroe[];
  private loading:boolean = true;

  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._heroesService.getHeroes().subscribe(
        data => {
          setTimeout(()=>{
            this.loading = false;
            this.heroes = data;
          }, 1000);
        },
        error => {
          console.log(error);
          setTimeout(()=>this.loading = false, 1000);
        }
    );
  }

  ngOnInit() {
  }

  eliminarHeroe(k){
    this._heroesService.deleteHeroe(k).subscribe(
        data => {
          //hubo error
          if(data){
            console.error(data);
          }
          else{
            delete this.heroes[k];
          }
        },
        error => {
          console.log(error);
        }
    );
  }

}
