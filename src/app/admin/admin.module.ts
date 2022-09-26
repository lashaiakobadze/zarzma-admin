import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { ArticlePanelComponent } from './article-panel/article-panel.component';
import { EparchyPanelComponent } from './article-panel/eparchy-panel/eparchy-panel.component';
import { IconsPanelComponent } from './article-panel/icons-panel/icons-panel.component';
import { PublicationsPanelComponent } from './article-panel/publications-panel/publications-panel.component';
import { ChantsPanelComponent } from './chants-panel/chants-panel.component';
import { ChantPanelComponent } from './chants-panel/chant-panel/chant-panel.component';
import { VideoItemComponent } from './video-panel/video-item/video-item.component';
import { AuthGuard } from '../authentication/auth.guard';
import { VideoComponent } from './video-panel/video.component';

@NgModule({
  declarations: [
    AdminNavigationComponent,
    ArticlePanelComponent,
    EparchyPanelComponent,
    IconsPanelComponent,
    PublicationsPanelComponent,
    ChantsPanelComponent,
    ChantPanelComponent,
    VideoComponent,
    VideoItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminNavigationComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'articlePanel', pathMatch: 'full' },
          { path: 'articlePanel', component: ArticlePanelComponent },
          { path: 'chantsPanel', component: ChantsPanelComponent },
          { path: 'videoPanel', component: VideoComponent }
        ]
      }
    ])
  ]
})
export class AdminModule { }
