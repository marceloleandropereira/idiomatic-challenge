import { Injectable } from '@angular/core';

import { FullName, FullNameStorage } from '../names/models/full-name.model';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  private localStorageIndex = 'fullNames';

  public getNamesParsed(): any[] {
    return JSON.parse(this.getNames());
  }

  public saveName(fullName: FullName): boolean {
    if (this.nameExists(fullName)) return false;

    let fullNames = this.getNamesParsed();
    fullNames.push(fullName);
    this.setNames(fullNames);

    return true;
  }

  public updateName(fullNameStorage: FullNameStorage): void {
    let fullNames = this.getNamesParsed();
    fullNames[fullNameStorage.index].name = fullNameStorage.name;
    fullNames[fullNameStorage.index].surname = fullNameStorage.surname;
    this.setNames(fullNames);
  }

  public deleteName(index: number): void {
    let fullNames = this.getNamesParsed();
    fullNames.splice(index, 1);
    this.setNames(fullNames);
  }

  private getNames(): any {
    if (!localStorage.getItem(this.localStorageIndex)) {
      this.setNames([]);
    }

    return localStorage.getItem(this.localStorageIndex);
  }

  private setNames(fullNames: FullName[]): void {
    localStorage.setItem(this.localStorageIndex, JSON.stringify(fullNames));
  }

  private nameExists(fullName: FullName): boolean {
    let fullNames = this.getNamesParsed();

    const name = fullNames.find((savedName: FullName) => {
      return savedName.name === fullName.name && savedName.surname === fullName.surname
    })

    return name === undefined ? false : true;
  }
}
