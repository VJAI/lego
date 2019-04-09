import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { delay, switchMap } from 'rxjs/operators';
import { Child, Parent } from '../../lego-base.component';
import { DropdownComponent } from '../../popup';
import { LegoBaseInputComponent } from '../lego-base-input.component';
import { TypeaheadOptionComponent } from './typeahead-option.component';
import { TypeaheadOptionsContainerComponent } from './typeahead-options-container.component';

export interface IQueryableDataSource {
  byId(id: string): Observable<any>;
  byIds(id: string[]): Observable<Array<any>>;
  query(search: string): Observable<IQueryResult>;
}

export interface IQueryResult {
  total: number;
  count: number;
  result: Array<any>;
}

@Component({
  selector: 'lego-typeahead',
  templateUrl: './typeahead.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => TypeaheadComponent) },
    { provide: Child, useExisting: forwardRef(() => TypeaheadComponent) }
  ]
})
export class TypeaheadComponent extends LegoBaseInputComponent<string | Array<string>> implements AfterViewInit {

  @Input()
  public placeholder: string;

  @Input()
  public selected: string | Array<string>;

  public get data(): string | Array<string> {
    return this.selected;
  }

  @Input()
  public set data(value: string | Array<string>) {
    this.selected = value;
    this.setInternal();
  }

  private _multiple = false;

  public get multiple(): boolean {
    return this._multiple;
  }

  @Input()
  public set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }

  @Input('source')
  public dataSource: Array<any> | IQueryableDataSource;

  @Input('id-string')
  public idString = 'id';

  @Input('value-string')
  public valueString = 'value';

  @Input('min-chars')
  public minChars = 0;

  @Input('delay')
  public delay = 250; // milliseconds

  @Input('container-css-classes')
  public containerCssClasses = '';

  public searchResult: Array<any> = [];

  @ViewChild('input')
  public input: ElementRef;

  @ViewChild(DropdownComponent)
  public dropdown: DropdownComponent;

  @ViewChild(TypeaheadOptionsContainerComponent)
  public optionsContainer: TypeaheadOptionsContainerComponent;

  @ContentChild('optionTemplate')
  public optionTemplate: TemplateRef<any>;

  @ContentChild('selectedOptions')
  public selectedOptionsTemplate: TemplateRef<any>;

  public get options(): Array<TypeaheadOptionComponent> {
    return this.optionsContainer.options.toArray();
  }

  public get isSelected(): boolean {
    return Array.isArray(this.selected) ? this.selected.length > 0 : !!this.selected;
  }

  public selectedItem: any;

  public selectedItems: Array<any> = [];

  public searchText = '';

  public busy = false;

  private initialized = false;

  private progressDelay = 500; // ms

  private keyManager: ActiveDescendantKeyManager<TypeaheadOptionComponent>;

  private progressSubscription: Subscription;

  private searchCallSubscription: Subscription;

  private timerId: number = null;

  exampleContext = {
    $implicit: 'default context property when none specified',
    aContextProperty: 'a context property'
  };

  public ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.setInternal();

      this.keyManager = new ActiveDescendantKeyManager(this.optionsContainer.options)
        .withHorizontalOrientation('ltr')
        .withVerticalOrientation()
        .withWrap();

      this.optionsContainer.options.changes.subscribe(() => {
        setTimeout(() => {
          this.keyManager.setFirstItemActive();
        });
      });
    });
  }

  public onSearchIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onInput(event: UIEvent) {
    this.searchResult = [];

    if (this.isSelected && !this.multiple) {
      this.selected = null;
    }

    if (!this.dropdown.showing) {
      this.dropdown.show();
    }

    this.timerId && window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(() => this.search(), this.delay);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.selectOption(this.keyManager.activeItem);
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.showing && this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
      this.scrollToOption();
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.showing && event.preventDefault();
    }
  }

  public showDropdown() {
    if (this.isSelected && !this.multiple) {
      return;
    }

    this.dropdown.show();
    this.search();
    this.keyManager.setFirstItemActive();
  }

  public hideDropdown() {
    this.dropdown.hide();
  }

  public selectOption(option: TypeaheadOptionComponent) {
    if (this.multiple) {
      const itemKey = option.key;
      this.selected = this.selected || [];
      const data = [...<Array<string>>this.selected];

      if (data.indexOf(itemKey) === -1) {
        data.push(itemKey);
        this.selectedItems.push(option.item);
      } else {
        data.splice(data.indexOf(itemKey), 1);
        this.selectedItems.splice(this.selectedItems.indexOf(option.item), 1);
      }

      this.selected = data;
    } else {
      this.selected = option.key;
      this.searchText = option.value;
      this.selectedItem = option.item;
      this.hideDropdown();
    }

    this.focus();
    this.onChange();
  }

  public removeSelectedOption(selectedItem: any) {
    (<Array<string>>this.selected).splice((<Array<string>>this.selected).indexOf(selectedItem[this.idString]), 1);
    this.selectedItems.splice(this.selectedItems.indexOf(selectedItem), 1);
  }

  public focus() {
    this.input.nativeElement.focus();
  }

  private scrollToOption() {
    const container = this.dropdown.getOverlayRef().hostElement
        .querySelector('lego-typeahead-options'),
      containerScrollTop = container.scrollTop,
      containerHeight = container.clientHeight,
      containerWidth = container.clientWidth,
      optionRect = this.options[0].el.nativeElement.getBoundingClientRect(),
      optionHeight = optionRect.height,
      optionWidth = optionRect.width,
      noOfOptionsInRow = Math.floor(containerWidth / optionWidth),
      topOptionPosition = Math.ceil(containerScrollTop / optionHeight) * noOfOptionsInRow,
      bottomOptionPosition = ((Math.ceil((containerScrollTop + containerHeight) / optionHeight) - 1) * noOfOptionsInRow) + 1,
      newActiveOptionPosition = this.options.indexOf(this.keyManager.activeItem) + 1;

    if (newActiveOptionPosition <= topOptionPosition) {
      container.scrollTop = Math.floor((newActiveOptionPosition  - 1) / noOfOptionsInRow) * optionHeight;
    } else if (newActiveOptionPosition >= bottomOptionPosition) {
      container.scrollTop = Math.ceil(newActiveOptionPosition / noOfOptionsInRow) * optionHeight - containerHeight;
    }
  }

  private setInternal() {
    if (!this.dataSource) {
      this.searchText = '';
      return;
    }

    if (this.multiple && this.selected && this.selected.length) {
      if (Array.isArray(this.dataSource)) {
        this.selectedItems = this.dataSource.filter(r => this.selected.indexOf(r[this.idString]) > -1);
      } else {
        this.dataSource.byId(<string>this.selected).subscribe(result => {
          this.selectedItems = result;
        });
      }
    } else if (this.selected) {
      if (Array.isArray(this.dataSource)) {
        this.selectedItem = this.dataSource.find(r => r[this.idString] === this.selected);
        this.searchText = this.selectedItem ? this.selectedItem[this.valueString] : '';
      } else {
        this.dataSource.byId(<string>this.selected).subscribe(result => {
          this.selectedItem = result;
          this.searchText = result ? result[this.valueString] : '';
        });
      }
    }
  }

  private search() {
    this.timerId = null;

    if (!this.dataSource) {
      return;
    }

    const searchText = this.input.nativeElement.value.trim();

    if (Array.isArray(this.dataSource)) {
      this.searchResult = searchText
        ? this.dataSource.filter(r => r[this.valueString].search(new RegExp(searchText, 'i')) > -1)
        : this.dataSource;
      return;
    }

    this.searchCallSubscription && this.searchCallSubscription.unsubscribe();

    this.progressSubscription = this.progressSubscription || of(true).pipe(delay(this.progressDelay))
      .subscribe(() => this.busy = true);

    this.searchCallSubscription = (<IQueryableDataSource>this.dataSource).query(searchText).subscribe((queryResult: IQueryResult) => {
      this.searchResult = queryResult.result;
      this.progressSubscription.unsubscribe();
      this.progressSubscription = null;
      this.busy = false;
    });
  }
}
