import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  Optional,
  QueryList,
  SimpleChanges,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Child, LegoBaseComponent, Parent } from '../lego-base.component';
import { CardComponent } from './card.component';

@Component({
  selector: 'lego-card-list',
  templateUrl: './card.list.html',
  providers: [
    { provide: Parent, useExisting: forwardRef(() => CardListComponent) },
    { provide: Child, useExisting: forwardRef(() => CardListComponent) }
  ]
})
export class CardListComponent extends LegoBaseComponent implements OnChanges, AfterViewInit {

  private _matrix = false;

  public get matrix(): boolean {
    return this._matrix;
  }

  @HostBinding('class.matrix')
  @Input()
  public set matrix(value: boolean) {
    this._matrix = coerceBooleanProperty(value);
  }

  @Input()
  public spacing = 32;

  @ContentChildren(CardComponent)
  public cards: QueryList<CardComponent>;

  @ViewChild('slit')
  public slit: ElementRef;

  @ViewChild('mover')
  public mover: ElementRef;

  public get translateXPos(): string {
    return `translateX(${this.xPos}px)`;
  }

  private xPos = 0;

  private cardWidth: number;

  private noOfCardsMoved = 0;

  private initialized = false;

  public get canNavigatePrevious() {
    return this.noOfCardsMoved > 0;
  }

  public get canNavigateNext() {
    if (!this.initialized) {
      return false;
    }

    const visibleCards = this.visibleCardsCount();
    const remainingCards = this.cards.length - visibleCards - this.noOfCardsMoved;
    return remainingCards > 0;
  }

  constructor(protected injector: Injector, @Optional() @SkipSelf() parent: Parent) {
    super(injector, parent);
  }

  public ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      if (changes.hasOwnProperty(prop)) {
        prop === 'spacing' && this.el.nativeElement.style.setProperty('--spacing', `${this.spacing}px`);
      }
    }
  }

  public ngAfterViewInit() {
    this.cardWidth = this.cards.first.el.nativeElement.offsetWidth;

    setTimeout(() => {
      this.initialized = true;
    });
  }

  public prev() {
    if (this.noOfCardsMoved === 0) {
      return;
    }

    const visibleCards = this.visibleCardsCount();
    this.noOfCardsMoved -= this.noOfCardsMoved < visibleCards ? this.noOfCardsMoved : visibleCards;
    this.xPos += visibleCards * (this.cardWidth + this.spacing);
  }

  public next() {
    if (this.noOfCardsMoved === this.cards.length) {
      return;
    }

    const visibleCards = this.visibleCardsCount();
    const remainingCards = this.cards.length - visibleCards - this.noOfCardsMoved;
    const cardsToMove = remainingCards < visibleCards ? remainingCards : visibleCards;
    this.noOfCardsMoved += cardsToMove;
    this.xPos -= cardsToMove * (this.cardWidth + this.spacing);
  }

  private visibleCardsCount() {
    const slitWidth = this.slit.nativeElement.offsetWidth;
    return Math.floor(slitWidth / this.cardWidth);
  }
}
