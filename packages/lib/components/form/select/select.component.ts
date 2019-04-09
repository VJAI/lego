import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild
} from '@angular/core';
import { Child, Parent } from '../../lego-base.component';
import { DropdownComponent } from '../../popup/index';
import { LegoBaseInputComponent } from '../lego-base-input.component';
import { SelectOptionComponent } from './select-option.component';

@Component({
  selector: 'lego-select',
  templateUrl: './select.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => SelectComponent) },
    { provide: Child, useExisting: forwardRef(() => SelectComponent) }
  ]
})
export class SelectComponent extends LegoBaseInputComponent<string | Array<string>> implements AfterViewInit {

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

  @Input('clear-text')
  public clearText = 'Clear Selection';

  @Input('empty-text')
  public emptyText = '';

  @Input('min-dropdown-width')
  public minDropdownWidth = 0;

  @Input('max-dropdown-width')
  public maxDropdownWidth = Infinity;

  @Input('sync-width')
  public syncWidth = true;

  @Input('dropdown-css')
  public dropdownCssClasses = '';

  @Input('container-css-classes')
  public containerCssClasses = '';

  @ViewChild(DropdownComponent)
  public dropdown: DropdownComponent;

  @ViewChild('input')
  public input: ElementRef;

  @ViewChild('selected')
  public selectedOptionsContainer: ElementRef;

  @ViewChild('unselected')
  public unSelectedOptionsContainer: ElementRef;

  @ViewChild('selectall')
  public selectAll: SelectOptionComponent;

  @ViewChild('clear')
  public clear: SelectOptionComponent;

  public get options(): Array<SelectOptionComponent> {
    return <Array<SelectOptionComponent>>this.children;
  }

  public selectedOption: SelectOptionComponent;

  public selectedOptions: Array<SelectOptionComponent> = [];

  private sortedOptions: Array<SelectOptionComponent> = [];

  public displayText: string;

  public selectedAll = false;

  private initialized = false;

  private currentActiveIndex = -1;

  private currentActiveItem: SelectOptionComponent;

  public get isSelected(): boolean {
    return Array.isArray(this.selected) ? this.selected.length > 0 : !!this.selected;
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.setInternal();
    });
  }

  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.selectOption(this.getCurrentActiveItem());
      event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.showing && this.hideDropdown();
    } else if (event.key === 'ArrowDown' || event.key === 'Down'
      || event.key === 'ArrowRight' || event.key === 'Right') {
      this.moveNext();
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'Up'
      || event.key === 'ArrowLeft' || event.key === 'Left') {
      this.movePrevious();
      event.preventDefault();
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.showing && event.preventDefault();
    }
  }

  public showDropdown() {
    this.dropdown.show();

    if (!this.options.length) {
      return;
    }

    this.currentActiveItem && this.currentActiveItem.setInactiveStyles();
    this.currentActiveItem = null;

    this.currentActiveIndex = 0;
    this.multiple && this.reArrangeOptions();

    const options = this.getNavigableOptions();
    this.setActive(this.currentActiveIndex);
  }

  public hideDropdown() {
    this.dropdown.hide();
  }

  public selectOption(option: SelectOptionComponent) {
    const options = this.multiple ? this.sortedOptions : this.options;

    if (option.selectAll) {
      this.data = this.selectedAll ? [] : this.options.map(selectedOption => selectedOption.keyOrValue);
    } else if (option.clear) {
      this.data = null;
    } else {
      if (this.multiple) {
        const keyOrValue = option.key || option.value;
        this.data = this.data || [];
        const data = [...<Array<string>>this.data];

        if (data.indexOf(keyOrValue) === -1) {
          data.push(keyOrValue);
        } else {
          data.splice(data.indexOf(keyOrValue), 1);
        }

        this.data = data;
      } else {
        this.data = option ? option.key || option.value : null;
      }
    }

    if (!this.multiple) {
      this.hideDropdown();
    }

    this.focus();
    this.onChange();
  }

  public focus() {
    this.input.nativeElement.focus();
  }

  public showClearOption() {
    if (this.multiple) {
      return false;
    }

    return !this.required && this.selected;
  }

  private reArrangeOptions() {
    if (!this.multiple) {
      return;
    }

    const unSelectedOptionsContainerEl = this.unSelectedOptionsContainer.nativeElement,
      selectedOptionsContainerEl = this.selectedOptionsContainer.nativeElement;

    this.options.forEach(option => {
      const optionEl = option.el.nativeElement;
      unSelectedOptionsContainerEl.contains(optionEl) && unSelectedOptionsContainerEl.removeChild(optionEl);
      selectedOptionsContainerEl.contains(optionEl) && selectedOptionsContainerEl.removeChild(optionEl);

      if (option.selected) {
        selectedOptionsContainerEl.appendChild(optionEl);
      } else {
        unSelectedOptionsContainerEl.appendChild(optionEl);
      }
    });

    selectedOptionsContainerEl.style.display = this.selectedOptions.length ? 'block' : 'none';
    unSelectedOptionsContainerEl.style.display = this.selectedAll ? 'none' : 'block';

    this.sortedOptions = [
      this.selectAll,
      ...this.options.filter(option => option.selected),
      ...this.options.filter(option => !option.selected)
    ];
  }

  private setInternal() {
    if (!this.initialized) {
      return;
    }

    if (this.multiple) {
      const data: Array<string> = this.data as Array<string> || [];
      this.selectedOptions = this.options.filter(option => data.indexOf(option.keyOrValue) > -1);
      this.displayText = this.selectedOptions.length ? this.selectedOptions.map(option => option.value).join(', ') : '';
      this.selectedAll = this.selectedOptions.length === this.options.length;
    } else {
      this.selectedOption = this.options.find(option => option.keyOrValue === this.data);
      this.displayText = this.selectedOption ? this.selectedOption.value : '';
    }
  }

  private moveNext() {
    const options = this.getNavigableOptions();
    this.setInActive(this.currentActiveIndex);
    this.currentActiveIndex++;

    if (this.currentActiveIndex >= options.length) {
      this.currentActiveIndex = 0;
    }

    this.setActive(this.currentActiveIndex);
    this.scrollToOption();
  }

  private movePrevious() {
    const options = this.getNavigableOptions();
    this.setInActive(this.currentActiveIndex);
    this.currentActiveIndex--;

    if (this.currentActiveIndex < 0) {
      this.currentActiveIndex = options.length - 1;
    }

    this.setActive(this.currentActiveIndex);
    this.scrollToOption();
  }

  private scrollToOption() {
    const container = this.dropdown.getOverlayRef().hostElement
        .querySelector('.select-options-container'),
      containerScrollTop = container.scrollTop,
      containerHeight = container.clientHeight,
      optionHeight = this.options[0].el.nativeElement.getBoundingClientRect().height,
      topOptionPosition = Math.ceil(containerScrollTop / optionHeight),
      bottomOptionPosition = Math.ceil((containerScrollTop + containerHeight) / optionHeight),
      newActiveOptionPosition = this.currentActiveIndex + 1;

    if (newActiveOptionPosition <= topOptionPosition) {
      container.scrollTop = (newActiveOptionPosition - 1) * optionHeight;
    } else if (newActiveOptionPosition >= bottomOptionPosition) {
      container.scrollTop = newActiveOptionPosition * optionHeight - containerHeight;
    }
  }

  private setInActive(index: number) {
    if (index === -1) {
      return;
    }

    this.getNavigableOptions()[index].setInactiveStyles();
  }

  private setActive(index: number | number) {
    const option = this.getNavigableOptions()[index];
    this.currentActiveItem = option;
    option.setActiveStyles();
  }

  private getCurrentActiveItem(): SelectOptionComponent {
    const options = this.getNavigableOptions();
    return options[this.currentActiveIndex];
  }

  private getNavigableOptions(): Array<SelectOptionComponent> {
    if (this.multiple) {
      return this.sortedOptions;
    }

    return this.showClearOption() ? [this.clear, ...this.options] : this.options;
  }
}
