import {
  ContentChildren,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  Optional,
  QueryList
} from '@angular/core';

import { Util } from '../util/index';

export abstract class Parent {}

export abstract class Child {}

export abstract class LegoBaseComponent {

  public readonly el: ElementRef;

  @HostBinding('id')
  @Input()
  public id = `comp-${Util.id()}`;

  public parent: LegoBaseComponent;

  @ContentChildren(Child)
  public contentChildren: QueryList<Child>;

  public get children(): Array<Child> {
    const children =  this.contentChildren.toArray();
    return this.contentChildren.first === this ? children.slice(1) : children;
  }

  constructor(protected injector: Injector, @Optional() parent: Parent) {
    this.el = this.injector.get(ElementRef);
    this.el.nativeElement.$comp = this;
    this.parent = <LegoBaseComponent>parent;
  }
}
