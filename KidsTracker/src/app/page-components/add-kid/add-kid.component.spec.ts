import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKidComponent } from './add-kid.component';

describe('AddKidComponent', () => {
  let component: AddKidComponent;
  let fixture: ComponentFixture<AddKidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
