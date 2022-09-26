import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChantInterface } from '../interfaces/chant.interface';
import { Chant } from '../models/chant.model';
import { ChantService } from './chants.service';

@UntilDestroy()
@Component({
  selector: 'app-chants-panel',
  templateUrl: './chants-panel.component.html',
  styleUrls: ['./chants-panel.component.scss']
})
export class ChantsPanelComponent implements OnInit {
  formMode = false;
  chantsItems: ChantInterface[] = [];
  chantForm: FormGroup;

  constructor(
    public chantService: ChantService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.chantService.getChants().pipe(untilDestroyed(this)).subscribe();
    this.chantService.getChantsItemsListener()
      .pipe(untilDestroyed(this))
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
    .pipe(untilDestroyed(this))
    .subscribe(
      () => {
        console.log('Article add successful!');
        this.chantForm.reset();
      }
    );
  }

  deleteChant(id: number): void {
    this.chantService.deleteChant(id).pipe(untilDestroyed(this)).subscribe();
  }

  initForm(): void {
    this.chantForm = new FormGroup({
      ChantName: new FormControl(''),
      AudioUrl: new FormControl(''),
    });
  }
}
