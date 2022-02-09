import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {

  public indexSelectedName: number = -1;
  public filter = new FormControl('');

  public nameForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required)
  });

  public fullNames = [
    {
      name: 'José',
      surname: 'Ricardo'
    },
    {
      name: 'Gavin',
      surname: 'Belson'
    },
    {
      name: 'João',
      surname: 'Frederico'
    },        
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.filter.valueChanges.subscribe
  }

  public get hasSelectedName(): boolean {
    return this.indexSelectedName !== -1;
  }

  public selectName(index: number): void {
    if (this.indexSelectedName === index) {
      this.clearSelection();
      return;
    }

    this.indexSelectedName = index;
    const fullName = this.fullNames[this.indexSelectedName];

    this.nameForm.controls['name'].setValue(fullName.name);
    this.nameForm.controls['surname'].setValue(fullName.surname);
  }

  public createName(): void {
    if (this.validateForm()) {
      this.fullNames.push({
        name: this.nameForm.controls['name'].value,
        surname: this.nameForm.controls['surname'].value,
      })
    }
  }

  public updateName(): void {
    if (this.validateForm()) {
      this.fullNames[this.indexSelectedName].name = this.nameForm.controls['name'].value;
      this.fullNames[this.indexSelectedName].surname = this.nameForm.controls['surname'].value;
    }
  }

  public deleteName(): void {
    this.fullNames.splice(this.indexSelectedName, 1);
    this.clearSelection();
  }

  private clearSelection(): void {
    this.indexSelectedName = -1;
    this.nameForm.reset();
  }

  private validateForm(): boolean {
    const formValid = this.nameForm.valid;

    if (!formValid) {
      alert('Fields Name and Surname are required');
    }

    return formValid;
  }
}
