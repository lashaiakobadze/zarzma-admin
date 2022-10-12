import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { ChantInterface } from '../interfaces/chant.interface';
import { ChantForm } from '../interfaces/form-Interfaces/chantForm.interface';
import { Chant } from '../models/chant.model';
import { ChantService } from './chants.service';

@UntilDestroy()
@Component({
  selector: 'app-chants-panel',
  templateUrl: './chants-panel.component.html',
  styleUrls: ['./chants-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChantsPanelComponent implements OnInit {
  formMode = false;
  chantsItems: ChantInterface[] = [];
  chantForm: FormGroup<ChantForm>;
  chantPanelError: ErrorMessages = null;


  constructor(
    public chantService: ChantService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.chantService.getChants()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.chantService.getChantsItemsListener()
      .pipe(untilDestroyed(this))
      .subscribe(chantsData => {
        this.chantsItems = chantsData;

        this.ref.markForCheck();
      });
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
      this.chantPanelError = ErrorMessages.chantPanelError;
      return;
    }

    this.chantPanelError = null;

    const myForm = document.forms[0];
    const formData = new FormData(myForm);

    this.chantService.storeChant(formData as unknown as Chant)
    .pipe(untilDestroyed(this))
    .subscribe(() => {
        this.chantPanelError = null;
        this.chantForm.reset();

        this.ref.markForCheck();
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
