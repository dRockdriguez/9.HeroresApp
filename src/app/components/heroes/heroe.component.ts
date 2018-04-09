import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"",
  };
  nuevo:boolean = false;
  id:string;

  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {

    let param = this._activatedRoute.params.subscribe( parametros => {
      this.id = parametros['id'];

      if(this.id == "nuevo"){
        this.nuevo = true;
      }
      else{
        this.nuevo = false;
        this._heroesService.getHeroe(this.id).subscribe(
          heroe =>{
            this.heroe = heroe;
          },
          error =>{
            console.log(error);
          }
        );
      }
    });
  }


  ngOnInit() {
  }

  guardar(){
    if(this.nuevo){
      this._heroesService.nuevoHeroe(this.heroe).subscribe(
        data => {
          this._router.navigate(['/heroe', data.name]);
        },
        error =>{
          console.log(error);
        }
      );
    }
    else{
      this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe(
        data => {
          console.log(data);
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  agregarNuevo(forma:NgForm){
    forma.reset();
    this._router.navigate(['/heroe', 'nuevo']);
  }
}
