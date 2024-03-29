import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  options: any = {};
  constructor(private toastr: ToastrService) { 
    this.options = {
      timeOut: 1000,
      positionClass: 'toast-top-right',
      progressBar: true,
    }

  }

  success(message: string) {
    this.options.timeOut = 1500;
    this.toastr.success(message, "Correcto",this.options);
  }

  danger(message: string) {
    this.options.timeOut = 3000;
    this.toastr.error(message, "Error",this.options);
  }

  information(message: string) {
    this.options.timeOut = 3000;
    this.toastr.info(message, "Información",this.options);
  }

  warning(message: string) {
    this.options.timeOut = 2000;
    this.toastr.warning(message, "Cuidado",this.options);
  }
}
