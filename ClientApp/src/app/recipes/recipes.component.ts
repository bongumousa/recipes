import { Component, OnInit, Inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[] = [];
  constructor(@Inject('BASE_URL') baseUrl: string, recipeService: RecipeService, private route: Router) {
    recipeService.getAll(baseUrl).subscribe((result: Recipe[]) => {
      this.recipes = result;
    }, error => console.error());
  }

  ngOnInit() {
  }

  viewSteps(id: string): void {
    this.route.navigate(['/steps', id]);
  }

  edit(id: string): void {
    console.log('id ', id );
    this.route.navigate(['/edit', id]);
  }
}
export interface Recipe {
  id: string;
  title: string;
  description: string;
  note: string;
  steps: [Step];
  isComplete: boolean;
}

export interface Step {
  step: string;
}
