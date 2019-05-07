import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderQRComponent } from './reader-qr.component';

describe('ReaderQRComponent', () => {
  let component: ReaderQRComponent;
  let fixture: ComponentFixture<ReaderQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
