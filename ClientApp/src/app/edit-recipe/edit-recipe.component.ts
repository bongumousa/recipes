import { Component, OnInit, Inject } from '@angular/core';
import { Recipe, Step } from '../recipes/recipes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { getBaseUrl } from '../../main';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  editForm: FormGroup;
  public id: string;
  public recipe: Recipe;
  public currentStep: string;
  public submitting: boolean;
  public steps: [Step] = [new Step];


  constructor(@Inject('BASE_URL') baseUrl: string, route: ActivatedRoute, private recipeService: RecipeService,
   private formBuilder: FormBuilder, private router: Router ) {
    route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id === '0') {
            this.recipe = new Recipe();
            this.constructForm();
      } else {
          recipeService.get(baseUrl, this.id).subscribe((result: Recipe) => {
              this.recipe = result;
              if (this.recipe.steps) {
                this.steps = this.recipe.steps;
              }
              this.constructForm();
          }, error => console.error());
        }
      });
  }

  ngOnInit() {
  }

  /**
   * construct a form
   */
  constructForm(): void {
    this.editForm = this.formBuilder.group({
      id: [this.recipe.id],
      title: [this.recipe.title, Validators.required ],
      description: [this.recipe.description, Validators.required],
      note: [this.recipe.note],
      currentStep: [this.currentStep]
    });
  }

  addStep() {
    if (!this.steps) {
      this.steps = [new Step];
    }
    if (this.editForm.value.currentStep !== '' && this.editForm.value.currentStep !== undefined) {
        const step = new Step();
        step.step = this.editForm.value.currentStep;
        this.steps.push(step);
    }
    this.currentStep = '';
  }
  /**
   *
   * submits a form with VALID values
   */
  onSubmit(): void {
    this.recipe = <Recipe> this.editForm.value;
    this.recipe.steps = this.steps;
    if (this.editForm.valid && this.submitting) {

      if (this.recipe.id === '0') {
        this.recipe.id = null;
        this.recipeService.add(getBaseUrl(), this.recipe).subscribe(result => {
        this.router.navigate(['/recipes']);
      }, error => console.error(error));

      } else {
        this.recipeService.update(getBaseUrl(), this.recipe).subscribe(result => {
          console.log('result', resizeTo);
      }, error => console.error(error));
      }
    } else {
      console.log('not a valid form', this.editForm);
    }
    this.submitting = false;
  }



}
