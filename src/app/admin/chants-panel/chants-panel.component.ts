import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChantInterface } from '../interfaces/chant.interface';
import { Chant } from '../models/chant.model';
import { ChantService } from './chants.service';

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
    public chantService: ChantService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.chantService.getChants().subscribe();
    this.chantsSub = this.chantService.getChantsItemsListener()
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

    this.chantService.storeChant(formData as unknown as Chant)
    .subscribe(
      () => {
        console.log('Article add successful!');
        this.chantForm.reset();
      }
    );
  }

  deleteChant(id: number): void {
    this.chantService.deleteChant(id).subscribe();
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
