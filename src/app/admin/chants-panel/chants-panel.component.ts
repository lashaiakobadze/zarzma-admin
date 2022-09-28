import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { ChantInterface } from '../interfaces/chant.interface';
import { ChantForm } from '../interfaces/form-Interfaces/chantForm.interface';
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
  chantForm: FormGroup<ChantForm>;

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
    if (!this.chantForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append("ChantName", this.chantForm.get('ChantName').value);
    formData.append("AudioUrl", this.chantForm.get('AudioUrl').value);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

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
    if(window.confirm('ნამდვილად გსურთ წაშლა?')){
      this.chantService.deleteChant(id).pipe(untilDestroyed(this)).subscribe();
    }
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.chantForm.get(controlName);
  }

  initForm(): void {
    this.chantForm = new FormGroup<ChantForm>({
      ChantName: new FormControl(null, AppValidators.required),
      AudioUrl: new FormControl(null, AppValidators.required),
    });
  }
}
