import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RavitaillerPage } from './ravitailler.page';

describe('RavitaillerPage', () => {
  let component: RavitaillerPage;
  let fixture: ComponentFixture<RavitaillerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RavitaillerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RavitaillerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
