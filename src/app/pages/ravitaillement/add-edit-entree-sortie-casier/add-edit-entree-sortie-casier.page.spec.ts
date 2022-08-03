import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditEntreeSortieCasierPage } from './add-edit-entree-sortie-casier.page';

describe('AddEditEntreeSortieCasierPage', () => {
  let component: AddEditEntreeSortieCasierPage;
  let fixture: ComponentFixture<AddEditEntreeSortieCasierPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEntreeSortieCasierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditEntreeSortieCasierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
