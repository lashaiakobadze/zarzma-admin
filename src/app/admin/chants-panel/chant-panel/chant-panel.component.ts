import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ChantInterface } from '../../interfaces/chant.interface';

@Component({
  selector: 'app-chant-panel',
  templateUrl: './chant-panel.component.html',
  styleUrls: ['./chant-panel.component.scss']
})
export class ChantPanelComponent implements OnInit {
  @Input() chant: ChantInterface;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onDeleteChant(id: number) {
    this.adminService.deleteChant(id);
  }

}
