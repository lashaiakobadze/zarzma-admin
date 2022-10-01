import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { ArticlePanelComponent } from './article-panel/article-panel.component';
import { ChantsPanelComponent } from './chants-panel/chants-panel.component';
import { ChantPanelComponent } from './chants-panel/chant-panel/chant-panel.component';
import { VideoComponent } from './video-panel/video.component';
import { VideoItemComponent } from './video-panel/video-item/video-item.component';
import { ArticleItemComponent } from './article-panel/article-item/article-item.component';

@NgModule({
  declarations: [
    ArticlePanelComponent,
    ArticleItemComponent,
    ChantsPanelComponent,
    ChantPanelComponent,
    VideoComponent,
    VideoItemComponent,
    AdminComponent,
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
          { path: 'chantsPanel', component: ChantsPanelComponent },
          { path: 'videoPanel', component: VideoComponent }
        ]
      }
    ])
  ]
})
export class AdminModule { }
