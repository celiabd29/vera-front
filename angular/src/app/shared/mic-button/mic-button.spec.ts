import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicButton } from './mic-button';

describe('MicButton', () => {
  let component: MicButton;
  let fixture: ComponentFixture<MicButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
