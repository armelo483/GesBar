import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitPage } from './produit.page';

describe('ProduitPage', () => {
  let component: ProduitPage;
  let fixture: ComponentFixture<ProduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
