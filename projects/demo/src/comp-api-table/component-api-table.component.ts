import { Component, Input, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';

@Component({
  selector: 'demo-comp-table',
  templateUrl: './compapitable.html',
  styleUrls: ['./_compapitable.scss']
})
export class ComponentApiTableComponent implements OnInit {

  @Input('file-name')
  public fileName: string;

  public data: any = {};

  constructor(private demoService: DemoService) { }

  ngOnInit(): void {
    this.demoService.getTableData(`${this.fileName}.json`).subscribe(res => this.data = res);
  }
}
