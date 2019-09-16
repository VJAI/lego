import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppbarDemoComponent } from './appbar/appbar-demo.component';
import { ButtonGroupDemoComponent } from './button-group/button-group-demo.component';
import { ChipsDemoComponent } from './chips/chips-demo.component';
import { ColorDemoComponent } from './color/color-demo.component';
import { DialogDemoComponent } from './dialog/dialog-demo.component';
import { EditorDemoComponent } from './editor/editor-demo.component';
import { IntroComponent } from './intro/intro-component';
import { ButtonDemoComponent } from './button/button-demo.component';
import { LoaderDemoComponent } from './loader/loader-demo.component';
import { PopoverDemoComponent } from './popover/popover-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { SliderDemoComponent } from './slider/slider-demo.component';
import { SpinnerDemoComponent } from './spinner/spinner-demo.component';
import { SwitchDemoComponent } from './switch/switch-demo.component';
import { ToastDemoComponent } from './toast/toast-demo.component';
import { TooltipDemoComponent } from './tooltip/tooltip-demo.component';
import { TypeaheadDemoComponent } from './typeahead/typeahead-demo.component';
import { TypographyDemoComponent } from './typography/typography-demo.component';
import { CardDemoComponent } from './card/card-demo.component';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { IconDemoComponent } from './icon/icon-demo.component';
import { TextDemoComponent } from './text/text-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { WidgetDemoComponent } from './widget/widget-demo.component';

const topics = [{
  name: 'intro',
  component: IntroComponent
}, {
  name: 'button',
  component: ButtonDemoComponent
}, {
  name: 'typo',
  component: TypographyDemoComponent
}, {
  name: 'color',
  component: ColorDemoComponent
}, {
  name: 'appbar',
  component: AppbarDemoComponent
}, {
  name: 'card',
  component: CardDemoComponent
}, {
  name: 'tabs',
  component: TabsDemoComponent
}, {
  name: 'icon',
  component: IconDemoComponent
}, {
  name: 'text',
  component: TextDemoComponent
}, {
  name: 'checkbox',
  component: CheckboxDemoComponent
}, {
  name: 'switch',
  component: SwitchDemoComponent
}, {
  name: 'select',
  component: SelectDemoComponent
}, {
  name: 'typeahead',
  component: TypeaheadDemoComponent
}, {
  name: 'chips',
  component: ChipsDemoComponent
}, {
  name: 'spinner',
  component: SpinnerDemoComponent
}, {
  name: 'tooltip',
  component: TooltipDemoComponent
}, {
  name: 'popover',
  component: PopoverDemoComponent
}, {
  name: 'toast',
  component: ToastDemoComponent
}, {
  name: 'dialog',
  component: DialogDemoComponent
}, {
  name: 'editor',
  component: EditorDemoComponent
}, {
  name: 'button-group',
  component: ButtonGroupDemoComponent
}, {
  name: 'slider',
  component: SliderDemoComponent
}, {
  name: 'loader',
  component: LoaderDemoComponent
}, {
  name: 'widget',
  component: WidgetDemoComponent
}];

@Component({
  selector: 'demo-lego',
  templateUrl: './demo.html',
  styleUrls: ['./_demo.scss']
})
export class DemoComponent implements OnInit, AfterViewInit {

  @ViewChild('main', { static : false })
  public main: ElementRef;

  private initialScrollTop: number;

  public currentTopic: any = {
    name: 'intro',
    component: IntroComponent
  };

  private fragment: string;

  private initialized = false;

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => this.showContent(params.get('topic') || 'intro'));
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      this.scrollToSection();
    });
  }

  ngAfterViewInit() {
    this.initialized = true;
    this.initialScrollTop = this.main.nativeElement.scrollTop;
    this.scrollToSection();
  }

  showContent(topic: string) {
    this.currentTopic = topics.find(c => c.name === topic.trim().toLowerCase());
    this.main && (this.main.nativeElement.scrollTop = this.initialScrollTop);
  }

  scrollToSection() {
    if (!this.initialized) {
      return;
    }

    // https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }
}
