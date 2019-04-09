import { Component, ContentChildren, QueryList } from '@angular/core';
import { LegoBaseComponent } from '../../lego-base.component';
import { TypeaheadOptionComponent } from './typeahead-option.component';

@Component({
  selector: 'lego-typeahead-options',
  template: '<ng-content select="lego-typeahead-option"></ng-content>'
})
export class TypeaheadOptionsContainerComponent extends LegoBaseComponent {

  @ContentChildren(TypeaheadOptionComponent)
  public options: QueryList<TypeaheadOptionComponent>;
}
