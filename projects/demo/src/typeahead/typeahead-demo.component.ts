import { Component, HostBinding, Input } from '@angular/core';
import { TypeaheadOptionComponent } from 'lego';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'demo-typeahead',
  templateUrl: './typeahead.html'
})
export class TypeaheadDemoComponent {

  public selectedTeam = '10';

  public selectedTeams = ['2', '3'];

  public countries = [{
    id: '1',
    value: `India. Long Text. Long Text. Long Text. Long Text. Long Text. 
    Long Text. Long Text. Long Text. Long Text. Long Text. Long Text. Long Text.`
  }, {
    id: '2',
    value: 'Australia'
  }, {
    id: '3',
    value: 'South Africa'
  }, {
    id: '4',
    value: 'New Zealand'
  }, {
    id: '5',
    value: 'Srilanka'
  }, {
    id: '6',
    value: 'Pakistan'
  }, {
    id: '7',
    value: 'Bangladesh'
  }, {
    id: '8',
    value: 'South Africa'
  }, {
    id: '9',
    value: 'Zimbabawe'
  }, {
    id: '10',
    value: 'West Indies'
  }, {
    id: '11',
    value: 'England'
  }, {
    id: '12',
    value: 'Afghanistan'
  }];

  public tags = [
    { id: '1', name: 'ASP.NET', desc: 'Framework for building web apps using .NET framework.' },
    { id: '2', name: 'JavaScript', desc: 'Client-side language used in browser for interacting with DOM.' },
    { id: '3', name: 'CSS', desc: 'Language for writing styles.' },
    { id: '4', name: 'Angular', desc: 'UI Framework for developing Single Page Apps.' },
    { id: '5', name: 'React', desc: 'Library for developing UI components.' },
    { id: '6', name: '.NET', desc: 'Microsof Framework for developing apps and services.' },
    { id: '7', name: 'Python', desc: 'An amazing programming language.' },
    { id: '8', name: 'NodeJS', desc: 'Framework that helps to run JS in server.' },
    { id: '9', name: 'Basic', desc: 'Classic programming language.' },
    { id: '10', name: 'SQL', desc: 'Database query language.' }
  ];

  public tags$ = {

    query: (search: string) => {
      const result = search ? this.tags.filter(tag => tag.name.search(new RegExp(search, 'i')) > -1) : this.tags;
      return of({
        result: result
      }).pipe(delay(3000));
    },

    byId: (id: string) => {
      const result = this.tags.find(tag => tag.id === id);
      return of(result).pipe(delay(3000));
    },

    byIds: (ids: Array<string>) => {
      const result = this.tags.filter(tag => ids.indexOf(tag.id) > -1);
      return of(result).pipe(delay(3000));
    }
  };

  public superheroes = [{
    id: '1',
    img: './assets/images/Captain-America.jpg',
    name: 'Captain America'
  }, {
    id: '2',
    img: './assets/images/hulk.jpg',
    name: 'Hulk'
  }, {
    id: '3',
    img: './assets/images/ironman.jpg',
    name: 'Ironman'
  }, {
    id: '4',
    img: './assets/images/spiderman.jpg',
    name: 'Spiderman'
  }, {
    id: '5',
    img: './assets/images/wonderwoman.jpg',
    name: 'Wonderwoman'
  }, {
    id: '6',
    img: './assets/images/chris-hemsworth.jpg',
    name: 'Thor'
  }, {
    id: '7',
    img: './assets/images/Captain-America.jpg',
    name: 'Captain America'
  }, {
    id: '8',
    img: './assets/images/hulk.jpg',
    name: 'Hulk'
  }, {
    id: '9',
    img: './assets/images/ironman.jpg',
    name: 'Ironman'
  }, {
    id: '10',
    img: './assets/images/spiderman.jpg',
    name: 'Spiderman'
  }, {
    id: '11',
    img: './assets/images/wonderwoman.jpg',
    name: 'Wonderwoman'
  }, {
    id: '12',
    img: './assets/images/chris-hemsworth.jpg',
    name: 'Thor'
  }, {
    id: '13',
    img: './assets/images/Captain-America.jpg',
    name: 'Captain America'
  }, {
    id: '14',
    img: './assets/images/hulk.jpg',
    name: 'Hulk'
  }, {
    id: '15',
    img: './assets/images/ironman.jpg',
    name: 'Ironman'
  }, {
    id: '16',
    img: './assets/images/spiderman.jpg',
    name: 'Spiderman'
  }, {
    id: '17',
    img: './assets/images/wonderwoman.jpg',
    name: 'Wonderwoman'
  }, {
    id: '18',
    img: './assets/images/chris-hemsworth.jpg',
    name: 'Thor'
  }, {
    id: '19',
    img: './assets/images/Captain-America.jpg',
    name: 'Captain America'
  }, {
    id: '20',
    img: './assets/images/hulk.jpg',
    name: 'Hulk'
  }, {
    id: '21',
    img: './assets/images/ironman.jpg',
    name: 'Ironman'
  }, {
    id: '22',
    img: './assets/images/spiderman.jpg',
    name: 'Spiderman'
  }, {
    id: '23',
    img: './assets/images/wonderwoman.jpg',
    name: 'Wonderwoman'
  }, {
    id: '24',
    img: './assets/images/chris-hemsworth.jpg',
    name: 'Thor'
  }];
}

@Component({
  selector: 'demo-custom-typeahead-option',
  templateUrl: 'custom-typeahead.html',
  styleUrls: ['./_custom-typeahead.scss']
})
export class CustomTypeaheadOptionComponent {

  @Input()
  public option: TypeaheadOptionComponent;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.option.selected;
  }

  @HostBinding('class.active')
  public get active(): boolean {
    return this.option.active;
  }
}
