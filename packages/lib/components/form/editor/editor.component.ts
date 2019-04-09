import { Component } from '@angular/core';
import { LegoBaseInputComponent } from '../lego-base-input.component';

@Component({
  selector: 'lego-editor',
  templateUrl: './editor.html'
})
export class EditorComponent extends LegoBaseInputComponent<string> {

}
