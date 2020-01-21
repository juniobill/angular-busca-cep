import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Cep } from './cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private httpClient: HttpClient) {}

  buscar(cep: string) {
    return this.httpClient
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(retry(2), catchError(this.handleError))
      .pipe(map(response => this.converterRespostaParaCep(response)));
  }

  private converterRespostaParaCep(cepNaResposta): Cep {
    const cep = new Cep();
    cep.cep = cepNaResposta.cep;
    cep.logradouro = cepNaResposta.logradouro;
    cep.complemento = cepNaResposta.complemento;
    cep.bairro = cepNaResposta.bairro;
    cep.cidade = cepNaResposta.localidade;
    cep.estado = cepNaResposta.uf;
    return cep;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
