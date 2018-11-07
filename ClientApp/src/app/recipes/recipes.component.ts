import { Component, OnInit, Inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[] = [];
  constructor(@Inject('BASE_URL') baseUrl: string, recipeService: RecipeService) {
    recipeService.getAll(baseUrl).subscribe((result: Recipe[]) => {
      this.recipes = result;
    }, error => console.error());
  }

  ngOnInit() {
  }
}
interface Recipe {
  id: string;
  title: string;
  description: string;
  note: string;
  // steps: [];
  isComplete: boolean;
}
