import { TestBed } from '@angular/core/testing';

import { NameService } from './name.service';

describe('NameService', () => {
  let service: NameService;
  let fullName1 = { name: 'John', surname: 'Papa' };
  let fullName2 = { name: 'Steve', surname: 'Jobs' };
  let fullName3 = { name: 'Tim', surname: 'Berners-Lee' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on call #getNamesParsed', () => {
    it('should return a parsed JSON with the names', () => {
      const object = JSON.stringify({ simple: 'object' });
      spyOn((service as any), 'getNames').and.returnValue(object)

      expect(service.getNamesParsed()).toEqual(JSON.parse(object));
    });
  });

  describe('on call #saveName', () => {
    it('should save the name and return true if name dont exists', () => {
      expect(service.getNamesParsed().length).toBe(0);

      const savedName = service.saveName(fullName1);

      expect(service.getNamesParsed().length).toBe(1);
      expect(savedName).toBe(true);
    });

    it('should return false if name exists', () => {
      service.saveName(fullName1);
      expect(service.getNamesParsed().length).toBe(1);

      const savedName = service.saveName(fullName1);

      expect(service.getNamesParsed().length).toBe(1);
      expect(savedName).toBe(false);
    });
  });

  describe('on call #updateName', () => {
    beforeEach(() => {
      service.saveName(fullName1);
      service.saveName(fullName2);
      service.saveName(fullName3);
    });

    it('should update the name according to the index', () => {
      const nameToUpdate = {
        name: 'John',
        surname: 'Deane',
        index: 1
      };

      service.updateName(nameToUpdate);
      const namesList = service.getNamesParsed();

      expect(namesList.length).toBe(3);
      expect(namesList[nameToUpdate.index].name).toBe(nameToUpdate.name);
      expect(namesList[nameToUpdate.index].surname).toBe(nameToUpdate.surname);
    });
  });

  describe('on call #deleteName', () => {
    beforeEach(() => {
      service.saveName(fullName1);
      service.saveName(fullName2);
      service.saveName(fullName3);
    });

    it('should delete the name according to the index', () => {
      expect(service.getNamesParsed().length).toBe(3);

      service.deleteName(0);

      const namesList = service.getNamesParsed();
      expect(namesList.length).toBe(2);
      expect(namesList).withContext(fullName2.name);
      expect(namesList).withContext(fullName3.name);
    });
  });
});
