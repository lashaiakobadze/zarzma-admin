import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ChantInterface } from '../interfaces/chant.interface';
import { Chant } from '../models/chant.model';

@Component({
  selector: 'app-chants-panel',
  templateUrl: './chants-panel.component.html',
  styleUrls: ['./chants-panel.component.scss']
})
export class ChantsPanelComponent implements OnInit, OnDestroy {
  formMode = false;
  chantsItems: ChantInterface[] = [];
  chantsSub: Subscription;
  chantForm: FormGroup;

  constructor(
    public adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.adminService.getChants();
    this.chantsSub = this.adminService.getChantsItemsListener()
      .subscribe(chantsData => {
        this.chantsItems = chantsData;
        console.log(chantsData);
      })
  }

  onGetArticleForm(): void {
    this.formMode = true;
  }

  processFile(audioInput: any): void {
    const file: File = audioInput.files[0];

    this.chantForm.value.files = [file];
  }

  onAddChant(): void {
    const formData = new FormData();
    formData.append("ChantName", this.chantForm.get('ChantName').value);
    formData.append("AudioUrl", this.chantForm.get('AudioUrl').value);

    this.adminService.storeChant(formData as unknown as Chant)
    .subscribe(
      () => {
        console.log('Article add successful!');
        this.chantForm.reset();
      },
      err => console.log('HTTP Error', err.error),
    );
  }

  initForm(): void {
    this.chantForm = new FormGroup({
      ChantName: new FormControl(''),
      AudioUrl: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.chantsSub?.unsubscribe();
  }
}
