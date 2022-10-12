import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusComponent {
}
