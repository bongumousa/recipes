import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipes/recipes.component';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  public id: string;
  public recipe: Recipe;

  constructor(@Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, recipeService: RecipeService ) {
    route.params.subscribe(params => {
      this.id = params['id'];
      recipeService.get(baseUrl, this.id).subscribe((result: Recipe) => {
          this.recipe = result;
      });
    }, error => console.error());
  }

  ngOnInit() {
  }

}
