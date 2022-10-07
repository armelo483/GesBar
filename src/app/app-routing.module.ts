import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'produit',
    loadChildren: () => import('./pages/produit/produit.module').then( m => m.ProduitPageModule)
  },
  {
    path: 'produit/add',
    loadChildren: () => import('./pages/produit/add-update-produit/add-update-produit.module').then( m => m.AddUpdateProduitPageModule)
  },
  {
    path: 'produit/view',
    loadChildren: () => import('./pages/produit/view-produit/view-produit.module').then( m => m.ViewProduitPageModule)
  },
  {
    path: 'produit/update',
    loadChildren: () => import('./pages/produit/add-update-produit/add-update-produit.module').then( m => m.AddUpdateProduitPageModule)
  },
  {
    path: 'ravitaillement',
    loadChildren: () => import('./pages/ravitaillement/ravitaillement.module').then( m => m.RavitaillementPageModule)
  },
  {
    path: 'ravitaillement/update',
    loadChildren: () => import('./pages/ravitaillement/add-edit-ravitaillement/add-edit-ravitaillement.module').then( m => m.AddEditRavitaillementPageModule)
  },
  {
    path: 'list_produit_ravitailler',
    loadChildren: () => import('./pages/ravitaillement/list-produit/list-produit.module').then( m => m.ListProduitPageModule)
  },
  {
    path: 'ravitailler',
    loadChildren: () => import('./pages/ravitaillement/ravitailler/ravitailler.module').then( m => m.RavitaillerPageModule)
  },
  {
    path: 'inventaire',
    loadChildren: () => import('./pages/inventaire/inventaire.module').then( m => m.InventairePageModule)
  },
  {
    path: 'ligne-depenses',
    loadChildren: () => import('./pages/depense/depense.module').then( m => m.DepensePageModule)
  },
  {
    path: 'depenses',
    loadChildren: () => import('./pages/depense/depense.module').then( m => m.DepensePageModule)
  },
  
  {
    path: 'ligne-depense/add',
    loadChildren: () => import('./pages/depense/add-edit-depense/add-edit-depense.module').then( m => m.AddEditDepensePageModule)
  },
  {
    path: 'ligne-depense/update',
    loadChildren: () => import('./pages/depense/add-edit-depense/add-edit-depense.module').then( m => m.AddEditDepensePageModule)
  },

  {
    path: 'ligne-depense/view',
    loadChildren: () => import('./pages/depense/view-depense/view-depense.module').then( m => m.ViewDepensePageModule)
  },

  {
    path: 'type-depense',
    loadChildren: () => import('./modal/type-depense/type-depense.module').then( m => m.TypeDepensePageModule)
  },
  // {
  //   path: 'text',
  //   loadChildren: () => import('./pages/text/text.module').then( m => m.TextPageModule)
  // },
  {
    path: 'point-vente',
    loadChildren: () => import('./pages/point-vente/point-vente.module').then( m => m.PointVentePageModule)
  },
  {
    path: 'point-vente/add',
    loadChildren: () => import('./pages/point-vente/add-update-point-vente/add-update-point-vente.module').then( m => m.AddUpdatePointVentePageModule)
  },
  {
    path: 'point-vente/update/:id',
    loadChildren: () => import('./pages/point-vente/add-update-point-vente/add-update-point-vente.module').then( m => m.AddUpdatePointVentePageModule)
  },
  {
    path: 'point-vente/view/:id',
    loadChildren: () => import('./pages/point-vente/view-point-vente/view-point-vente.module').then( m => m.ViewPointVentePageModule)
  },
  {
    path: 'casier',
    loadChildren: () => import('./pages/casier/casier.module').then( m => m.CasierPageModule)
  },
  {
    path: 'casier/add',
    loadChildren: () => import('./pages/casier/add-update-casier/add-update-casier.module').then( m => m.AddUpdateCasierPageModule)
  },
  {
    path: 'casier/view/:id',
    loadChildren: () => import('./pages/casier/view-casier/view-casier.module').then( m => m.ViewCasierPageModule)
  },
  {
    path: 'casier/update/:id',
    loadChildren: () => import('./pages/casier/add-update-casier/add-update-casier.module').then( m => m.AddUpdateCasierPageModule)
  },
  {
    path: 'fournisseur',
    loadChildren: () => import('./pages/fournisseur/fournisseur.module').then( m => m.FournisseurPageModule)
  },
  {
    path: 'fournisseur/add',
    loadChildren: () => import('./pages/fournisseur/add-update-fournisseur/add-update-fournisseur.module').then( m => m.AddUpdateFournisseurPageModule)
  },
  {
    path: 'fournisseur/update/:id',
    loadChildren: () => import('./pages/fournisseur/add-update-fournisseur/add-update-fournisseur.module').then( m => m.AddUpdateFournisseurPageModule)
  },
  {
    path: 'fournisseur/view',
    loadChildren: () => import('./pages/fournisseur/view-fournisseur/view-fournisseur.module').then( m => m.ViewFournisseurPageModule)
  },
  {
    path: 'fournisseur/view/:id',
    loadChildren: () => import('./pages/fournisseur/view-fournisseur/view-fournisseur.module').then( m => m.ViewFournisseurPageModule)
  },
  {
    path: 'categorie-produit',
    loadChildren: () => import('./pages/categorie-produit/categorie-produit.module').then( m => m.CategorieProduitPageModule)
  },
  {
    path: 'categorie-depense',
    loadChildren: () => import('./pages/categorie-depense/categorie-depense.module').then( m => m.CategorieDepensePageModule)
  },
  {
    path: 'categorie-depense/add',
    loadChildren: () => import('./pages/categorie-depense/add-update-categorie-depense/add-update-categorie-depense.module').then( m => m.AddUpdateCategorieDepensePageModule)
  },
  {
    path: 'categorie-depense/view/:id',
    loadChildren: () => import('./pages/categorie-depense/view-categorie-depense/view-categorie-depense.module').then( m => m.ViewCategorieDepensePageModule)
  },
  {
    path: 'categorie-depense/update/:id',
    loadChildren: () => import('./pages/categorie-depense/add-update-categorie-depense/add-update-categorie-depense.module').then( m => m.AddUpdateCategorieDepensePageModule)
  },
  // {
  //   path: 'ligne-employe',
  //   loadChildren: () => import('./pages/ligne-employe/ligne-employe.module').then( m => m.LigneEmployePageModule)
  // },
  {
    path: 'employe',
    loadChildren: () => import('./pages/employe/employe.module').then( m => m.EmployePageModule)
  },
  {
    path: 'employe/add',
    loadChildren: () => import('./pages/employe/add-update-employe/add-update-employe.module').then( m => m.AddUpdateEmployePageModule)
  },
  {
    path: 'employe/update/:id',
    loadChildren: () => import('./pages/employe/add-update-employe/add-update-employe.module').then( m => m.AddUpdateEmployePageModule)
  },
  {
    path: 'employe/view/:id',
    loadChildren: () => import('./pages/employe/view-employe/view-employe-routing.module').then( m => m.ViewEmployePageRoutingModule)
  },
  {
    path: 'categorie-produit/update/:id',
    loadChildren: () => import('./pages/categorie-produit/add-update-categorie-produit/add-update-categorie-produit-routing.module').then( m => m.AddUpdateCategorieProduitPageRoutingModule)
  },
  {
    path: 'avarie',
    loadChildren: () => import('./pages/avarie/avarie.module').then( m => m.AvariePageModule)
  },
  {
    path: 'avarie/add',
    loadChildren: () => import('./pages/avarie/add-update-avarie/add-update-avarie.module').then( m => m.AddUpdateAvariePageModule)
  },
  {
    path: 'avarie/update',
    loadChildren: () => import('./pages/avarie/add-update-avarie/add-update-avarie.module').then( m => m.AddUpdateAvariePageModule)
  },
  {
    path: 'avarie/view',
    loadChildren: () => import('./pages/avarie/view-avarie/view-avarie.module').then( m => m.ViewAvariePageModule)
  },  {
    path: 'update-recap',
    loadChildren: () => import('./pages/update-recap/update-recap.module').then( m => m.UpdateRecapPageModule)
  },
  {
    path: 'rapport',
    loadChildren: () => import('./pages/rapport/rapport.module').then( m => m.RapportPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
