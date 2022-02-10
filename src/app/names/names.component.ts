import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { NameService } from '../services/name.service';
import { FullName, FullNameStorage } from './models/full-name.model';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit, OnDestroy {

  public indexSelectedName: number = -1;
  public filter = new FormControl('');

  public nameForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required)
  });

  public fullNames: FullName[];
  public fullNamesFiltered: FullNameStorage[];

  private subscription: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private nameService: NameService
  ) { }

  ngOnInit(): void {
    this.listenerFilter();
    this.refreshNamesList();
  }

  public ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
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
      const saved = this.nameService.saveName({
        name: this.nameForm.controls['name'].value,
        surname: this.nameForm.controls['surname'].value,
      });

      if (saved) {
        this.refreshNamesList();
      } else {
        alert('Name already registered');
      }
    }
  }

  public updateName(): void {
    if (this.validateForm()) {
      this.nameService.updateName({
        index: this.indexSelectedName,
        name: this.nameForm.controls['name'].value,
        surname: this.nameForm.controls['surname'].value
      });

      this.refreshNamesList();
    }
  }

  public deleteName(): void {
    this.nameService.deleteName(this.indexSelectedName);
    this.refreshNamesList();
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

  private refreshNamesList(): void {
    this.fullNames = this.nameService.getNamesParsed();
    this.setFilteredFullNames();
  }

  private listenerFilter(): void {
    this.filter.valueChanges
      .pipe(debounceTime(300), takeUntil(this.subscription))
      .subscribe(() => {
        this.setFilteredFullNames();
      });
  }

  private setFilteredFullNames(): void {
    const filteredNames: FullNameStorage[] = [];
    let selectedName = false;

    this.fullNames.forEach((fullName: FullName, index: number) => {
      if (fullName.surname.toLowerCase().startsWith(this.filter.value.toLowerCase())) {
        filteredNames.push({
          name: fullName.name,
          surname: fullName.surname,
          index
        });

        if (this.indexSelectedName === index) {
          selectedName = true;
        }
      }
    });

    this.fullNamesFiltered = filteredNames;

    if (!selectedName) {
      this.clearSelection();
    }
  }
}
