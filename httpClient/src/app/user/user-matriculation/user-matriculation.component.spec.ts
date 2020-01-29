import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatriculationComponent } from './user-matriculation.component';

describe('UserMatriculationComponent', () => {
  let component: UserMatriculationComponent;
  let fixture: ComponentFixture<UserMatriculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatriculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatriculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
