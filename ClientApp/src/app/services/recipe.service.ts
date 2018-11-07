import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }
 /**
   * get a full list of recipes
   * @param baseUrl
   */
  getAll(baseUrl: string) {
    return this.http.get(baseUrl + 'api/recipes');
  }
}
