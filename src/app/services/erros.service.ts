import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})  
export class ErrorService {
  constructor(private toastr: ToastrService) { }

  /**
   * Manipula erros de HttpErrorResponse, especialmente os de validação do DRF/Djoser.
   * @param err O objeto de erro HttpErrorResponse
   */
  public handleError(err: HttpErrorResponse): void {
    const errorData = err.error;

    if (typeof errorData === 'object' && errorData !== null) {
      for (const key in errorData) {
        if (Object.prototype.hasOwnProperty.call(errorData, key)) {
          const messages = errorData[key];
          if (Array.isArray(messages)) {
            messages.forEach(message => {
              this.showError(message, this.formatFieldName(key));
            });
          }
        }
      }
    } else if (err.statusText) {
      // CORRIGIDO: Uso de crases para interpolação de string
      this.showError(err.statusText, `Erro ${err.status}`);
    } else {
      this.showError('Ocorreu um erro inesperado. Tente novamente.', 'Erro');
    }
  }

  private showError(message: string, title: string): void {
    this.toastr.error(message, title);
  }

  private formatFieldName(field: string): string {
    if (field === 'non_field_errors' || field === 'detail') {
      return 'Erro de Autenticação';
    }
    // MELHORADO: Usa expressão regular para substituir todos os underscores
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
  }
}