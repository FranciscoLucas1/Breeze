import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})  
export class NotificacaoService {
  constructor(private toastr: ToastrService) { }

  

  public sucesso(message: string, title: string): void {
    this.toastr.success(title, message);
  }


  public trataErro(err: HttpErrorResponse): void {
    const errorData = err.error;

    if (typeof errorData === 'object' && errorData !== null) {
      // Percorre todas as chaves do objeto de erro retornado pelo backend
      for (const key in errorData) {
        if (Object.prototype.hasOwnProperty.call(errorData, key)) {
          const messages = errorData[key];

          if (Array.isArray(messages)) {
            messages.forEach(message => {
              this.showError(message, this.formatFieldName(key));
            });
          } else {
            this.showError(String(messages), this.formatFieldName(key));
          }
        }
      }
    } else if (err.statusText) {
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
    // expressão regular para substituir todos os _
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
  }
}