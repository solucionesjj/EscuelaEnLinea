import { Injectable } from '@angular/core';
import { ApiclientService } from '../apiclient.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: ApiclientService) { }

  async areaGet(): Promise<any> {
    const result = await this.http.Get("area");
    return result;
  }

  async areaAdd(area): Promise<any> {
    const result = await this.http.Post("area/create", area);
    return result;
  }

  async areaUpdate(area): Promise<any> {
    const result = await this.http.Put("area/" + area.id, area);
    return result;
  }

  async areaDelete(area): Promise<any> {
    const result = await this.http.Delete("area/" + area.id);
    return result;
  }
}
