import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipes.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

 /**
   * get a full list of recipes
   * @param baseUrl
   */
  getAll(baseUrl: string) {
    return this.http.get(baseUrl + 'api/recipes/');
  }


 /**
   * get a full list of recipes
   * @param baseUrl
   */
  get(baseUrl: string, id: string) {
    return this.http.get(baseUrl + 'api/recipes/' + id);
  }

  /**
   *  add a new recipe
   * @param baseUrl
   * @param recipe
   */
  add(baseUrl: string, recipe: Recipe) {
    return this.http.post(baseUrl + 'api/recipes/', recipe);
  }

  /**
   * updates recipe
   * @param baseUrl
   * @param recipe
   */
  update(baseUrl: string, recipe: Recipe) {
    return this.http.put(baseUrl + 'api/recipes/', recipe);
  }

  delete(baseUrl: string, id: string) {
    return this.http.delete(baseUrl + 'api/recipes/' + id);
  }

}
