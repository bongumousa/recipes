import { Component, OnInit, Inject } from '@angular/core';
import { Recipe, Step } from '../recipes/recipes.component';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  editForm: FormGroup;
  public id: string;
  public recipe: Recipe;
  public steps: [Step];

  constructor(@Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, recipeService: RecipeService,
   private formBuilder: FormBuilder ) {
    route.params.subscribe(params => {
      this.id = params['id'];
      recipeService.get(baseUrl, this.id).subscribe((result: Recipe) => {
          this.recipe = result;
          this.constructForm();
      });
    }, error => console.error());
  }

  ngOnInit() {
  }

  constructForm(): void {
    this.editForm = this.formBuilder.group({
      title: [this.recipe.title, Validators.required ],
      description: [this.recipe.description, Validators.required],
      note: [this.recipe.note]
    });
  }

  /**
   *
   * submits a form with VALID values
   */
  onSubmit(): void {
    if (this.editForm.valid) {
      console.log('==== valid form', this.editForm.value);
      console.log('valid form', this.editForm);
    } else {
      console.log('not a valid form', this.editForm);
    }
  }

}
