import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { NamesComponent } from './names.component';

describe('NamesComponent', () => {
  let component: NamesComponent;
  let fixture: ComponentFixture<NamesComponent>;
  let fullName1 = { name: 'John', surname: 'Papa' };
  let fullName2 = { name: 'Steve', surname: 'Jobs' };
  let fullName3 = { name: 'Tim', surname: 'Berners-Lee' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamesComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on call #selectName', () => {
    beforeEach(() => {
      component.fullNames = [fullName1, fullName2, fullName3];
    });

    it('should change indexSelectedName according to the index and fill the form fields', () => {
      expect(component.indexSelectedName).toBe(-1);
      const index = 1;

      component.selectName(index);

      expect(component.indexSelectedName).toBe(1);
      expect(component.nameForm.controls['name'].value).toBe(component.fullNames[index].name);
      expect(component.nameForm.controls['surname'].value).toBe(component.fullNames[index].surname);
    });

    it('should call #clearSelection if the name is already selected', () => {
      const spyOnClearSelection = spyOn((component as any), 'clearSelection');
      component.indexSelectedName = 1;

      component.selectName(component.indexSelectedName);

      expect(spyOnClearSelection).toHaveBeenCalled();
    });
  });

  describe('on call #createName', () => {
    beforeEach(() => {
      localStorage.clear();
      component.fullNames = [];
    });

    it('should create a fullName with form is valid', () => {
      component.nameForm.controls['name'].setValue(fullName1.name);
      component.nameForm.controls['surname'].setValue(fullName1.surname);

      component.createName();

      expect(component.fullNames.length).toBe(1);
      expect(component.fullNames).toContain(fullName1);
    });

    it('shouldnt create a fullName with form is not valid', () => {
      component.nameForm.controls['name'].setValue('');

      component.createName();

      expect(component.fullNames.length).toBe(0);
    });

    it('shouldnt create a fullName with name is already registered', () => {
      localStorage.setItem('fullNames', JSON.stringify([fullName1]));
      (component as any).refreshNamesList();
      const spyOnrefreshNamesList = spyOn((component as any), 'refreshNamesList');

      expect(component.fullNames.length).toBe(1);

      component.createName();

      expect(component.fullNames.length).toBe(1);
      expect(spyOnrefreshNamesList).not.toHaveBeenCalled();
    });
  });

  describe('on call #updateName', () => {
    beforeEach(() => {
      localStorage.clear();
      component.nameForm.controls['name'].setValue(fullName1.name);
      component.nameForm.controls['surname'].setValue(fullName1.surname);
      component.createName();
      component.indexSelectedName = 0;
    });

    it('should update the name with form is valid', () => {
      const newSurname = 'Deep';
      component.nameForm.controls['name'].setValue(fullName1.name);
      component.nameForm.controls['surname'].setValue(newSurname);

      expect(component.fullNames.length).toBe(1);

      component.updateName();

      expect(component.fullNames.length).toBe(1);
      expect(component.fullNames[component.indexSelectedName].surname).toBe(newSurname);
    });

    it('shouldnt update the name with form is not valid', () => {
      component.nameForm.controls['name'].setValue('');

      component.updateName();

      expect(component.fullNames[component.indexSelectedName]).toEqual(fullName1);
    });
  });

  describe('on call #deleteName', () => {
    beforeEach(() => {
      localStorage.clear();
      component.nameForm.controls['name'].setValue(fullName1.name);
      component.nameForm.controls['surname'].setValue(fullName1.surname);
      component.createName();
      component.indexSelectedName = 0;
    });

    it('should delete the name according to the index', () => {
      expect(component.fullNames.length).toBe(1);

      component.deleteName();

      expect(component.fullNames.length).toBe(0);
    });
  });
});
