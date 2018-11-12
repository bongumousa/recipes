import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RecipeService } from './services/recipe.service';
import { RecipesComponent } from './recipes/recipes.component';
import { StepsComponent } from './steps/steps.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RecipesComponent,
    StepsComponent,
    EditRecipeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: RecipesComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'recipes', component: RecipesComponent },
      { path: 'steps/:id', component: StepsComponent },
      { path: 'edit/:id', component: EditRecipeComponent }
    ]),
    ReactiveFormsModule
  ],
  providers: [RecipeService, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
