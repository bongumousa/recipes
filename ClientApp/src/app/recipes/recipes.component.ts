import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getBaseUrl } from '../../main';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[] = [];
  public show_content = true;
  public modalRef: BsModalRef;
  public message: string;
  public steps: [Step];
  public items: any[];
  public title: string;

  constructor(@Inject('BASE_URL') baseUrl: string, private recipeService: RecipeService, private router: Router,
  private modalService: BsModalService) {
    this.items = Array(15).fill(0);
    recipeService.getAll(baseUrl).subscribe((result: Recipe[]) => {
      this.recipes = result;
    }, error => console.error());
  }

  ngOnInit() {
  }

  /**
   * view steps of a recipe
   */
  viewSteps(title: string, steps: [Step], template: TemplateRef<any>): void {
    this.steps = steps;
    this.title = title;
    this.openModal(template);
  }

  edit(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  /**
   * removes recipe
   * @param id
   */
  delete(id: string) {
      this.show_content = false;
      this.recipeService.delete(getBaseUrl(), id).subscribe(results => {
        console.log('results', results);
        this.show_content = true;
      }, error =>  console.error());
  }

  /**
   * adds new record
   */
  add() {
    this.router.navigate(['/edit', '0']);
  }

  close(): void {
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

export class Recipe {
  id: string;
  title: string;
  description: string;
  note: string;
  steps: [Step];
  isComplete: boolean;

  constructor() {
    return {
      id: '0',
      title:  '',
      description: '',
      note: '',
      steps: [new Step],
      isComplete: false
    };
  }
}

export class Step {
  step: string;
  constructor() {
    return {
      step: ''
      };
  }
}

