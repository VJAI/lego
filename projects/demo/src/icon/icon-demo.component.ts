import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';

@Component({
  selector: 'demo-icon',
  templateUrl: './icon.html',
  styleUrls: ['./_icon.scss']
})
export class IconDemoComponent implements OnInit {

  constructor(private demoService: DemoService) { }

  public icons: Array<string> = [];

  ngOnInit(): void {
    this.demoService.getTableData('icons.json').subscribe((res: Array<string>) => (this.icons = res));
  }

  public copy(event: UIEvent) {
    const span = (<any>event.target).querySelector('span');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    alert(`${span.textContent} is copied to clipboard!`);
  }
}
