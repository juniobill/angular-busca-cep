import { Component, OnInit } from '@angular/core';
import { CepService } from '../cep.service';
import { Cep } from '../cep';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {
  cep = new Cep();
  isLoading = false;

  constructor(private cepService: CepService) {}

  ngOnInit() {}

  buscar() {
    this.isLoading = true;
    this.cepService.buscar(this.cep.cep).subscribe((cep: Cep) => {
        this.isLoading = false;
        this.cep = cep;
      }, error => {
        this.isLoading = false;
        const cep = this.cep.cep;
        this.cep = new Cep();
        this.cep.cep = cep;
        alert('Ocorreu um problema na busca');
      });
  }
}
