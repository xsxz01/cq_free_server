import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServiceComponent } from './online-service.component';

describe('OnlineServiceComponent', () => {
  let component: OnlineServiceComponent;
  let fixture: ComponentFixture<OnlineServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
