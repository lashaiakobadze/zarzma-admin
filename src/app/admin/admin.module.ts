import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { ArticlePanelComponent } from './article-panel/article-panel.component';
import { EparchyPanelComponent } from './article-panel/eparchy-panel/eparchy-panel.component';
import { IconsPanelComponent } from './article-panel/icons-panel/icons-panel.component';
import { PublicationsPanelComponent } from './article-panel/publications-panel/publications-panel.component';
import { ChantsPanelComponent } from './chants-panel/chants-panel.component';
import { ChantPanelComponent } from './chants-panel/chant-panel/chant-panel.component';



@NgModule({
  declarations: [
    AdminComponent,
    ArticlePanelComponent,
    EparchyPanelComponent,
    IconsPanelComponent,
    PublicationsPanelComponent,
    ChantsPanelComponent,
    ChantPanelComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'articlePanel', pathMatch: 'full' },
          { path: 'articlePanel', component: ArticlePanelComponent },
          { path: 'chantsPanel', component: ChantsPanelComponent }
        ]
      }
    ])
  ]
})
export class AdminModule { }
