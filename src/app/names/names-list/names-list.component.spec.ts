import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesListComponent } from './names-list.component';

describe('NamesListComponent', () => {
  let component: NamesListComponent;
  let fixture: ComponentFixture<NamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSelectName on call #selectName', () => {
    const spyonSelectName = spyOn(component.onSelectName, 'emit');
    const indexEmit = 1;

    component.selectName(indexEmit);

    expect(spyonSelectName).toHaveBeenCalledWith(indexEmit);
  });
});
