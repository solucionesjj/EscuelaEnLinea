import { Injectable } from '@angular/core';
import { ApiclientService } from './apiclient.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public model: string;
  constructor(private http: ApiclientService) {
  }

  async get(): Promise<any> {
    const result = await this.http.Get('crud?model=' + this.model);
    return result;
  }

  async getSearch(searchCriteria: string): Promise<any> {
    const result = await this.http.Get('crud/search?model=' + this.model + '&searchCriteria=' + searchCriteria);
    return result;
  }

  async getDynamicQuery(query: string): Promise<any> {
    const result = await this.http.Get('crud/getbyquery?model=' + this.model + '&query=' + query);
    return result;
  }

  async add(object): Promise<any> {
    const result = await this.http.Post('crud?model=' + this.model, object);
    return result;
  }

  async update(object): Promise<any> {
    const result = await this.http.Put('crud?model='  + this.model + '&id=' + object.id, object);
    return result;
  }

  async delete(object): Promise<any> {
    const result = await this.http.Delete('crud?model='  + this.model + '&id=' + object.id);
    return result;
  }
}
