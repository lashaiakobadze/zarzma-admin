import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChantInterface } from '../../interfaces/chant.interface';

@Component({
  selector: 'app-chant-panel',
  templateUrl: './chant-panel.component.html',
  styleUrls: ['./chant-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChantPanelComponent implements OnInit {
  @Input() chant: ChantInterface;
  @Output() deleteChantClicked = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onDeleteChant(id: number) {
    this.deleteChantClicked.emit(id);
  }

}
