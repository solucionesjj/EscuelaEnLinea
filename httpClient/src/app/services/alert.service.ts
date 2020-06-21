import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toastr: ToastrService) { }

  success(message: string) {
    this.toastr.success(message, "Correcto");
  }

  danger(message: string) {
    this.toastr.error(message, "Error");
  }

  information(message: string) {
    this.toastr.info(message, "Información");
  }

  warning(message: string) {
    this.toastr.warning(message, "Cuidado");
  }
}
