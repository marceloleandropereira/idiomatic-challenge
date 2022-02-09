import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {

  public filter = new FormControl('');

  public nameForm = this.formBuilder.group({
    name: new FormControl(''),
    surname: new FormControl('')
  });

  public names: string[] = ['José Ricardo', 'João Frederico', 'Gavin Belson'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.filter.valueChanges.subscribe
  }

}
