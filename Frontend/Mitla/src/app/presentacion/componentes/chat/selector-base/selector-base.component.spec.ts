import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectorBaseComponent } from './selector-base.component';

describe('SelectorBaseComponent', () => {
  let component: SelectorBaseComponent;
  let fixture: ComponentFixture<SelectorBaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SelectorBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
