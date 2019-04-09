import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';
import { IFormData } from './form.data';
import { FormType } from './form.type';

@Component({
  selector: 'lego-form',
  templateUrl: './form.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => FormComponent) },
    { provide: Child, useExisting: forwardRef(() => FormComponent) }
  ]
})
export class FormComponent extends LegoBaseComponent implements OnChanges, AfterContentInit, AfterViewInit {

  @HostBinding('class')
  public compCssClass = 'leg-form';

  @Input()
  public name: string;

  @Input()
  public accept: string;

  @Input()
  public action: string;

  @Input()
  public autocomplete: string;

  @Input()
  public enctype: string;

  @Input()
  public method: string;

  @Input()
  public target: string;

  public get data(): IFormData {
    return this.getData();
  }

  @Input()
  public set data(value: IFormData) {
    this.setData(value);
  }

  @Input()
  public formType: FormType = FormType.Reactive;

  @Output()
  public formSubmit: EventEmitter<this> = new EventEmitter();

  public form: FormGroup;

  constructor(protected injector: Injector,
              protected fb: FormBuilder,
              protected cdr: ChangeDetectorRef,
              @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
    this.form = this.fb.group({});
  }

  ngOnChanges(changes) {
    for (const prop in changes) {
      if (prop === 'data') {
        this.setData(this.data);
      }
    }
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public getData(): IFormData {
    throw new Error('Not implemented');
  }

  public setData(data: IFormData): this {
    return this;
  }

  public validate(): this {
    throw new Error('Not implemented');
  }

  public isValid(field?: string): boolean {
    throw new Error('Not implemented');
  }

  public submit(): this {
    throw new Error('Not implemented');
  }

  public reset(): this {
    return this;
  }

  public isReactive(): boolean {
    return this.formType === FormType.Reactive;
  }

  public submitHandler(): this {
    this.formSubmit.emit();
    return this;
  }
}
