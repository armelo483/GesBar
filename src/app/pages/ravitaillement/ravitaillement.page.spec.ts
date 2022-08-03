import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RavitaillementPage } from './ravitaillement.page';

describe('RavitaillementPage', () => {
  let component: RavitaillementPage;
  let fixture: ComponentFixture<RavitaillementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RavitaillementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RavitaillementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
