// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Produit } from '../models/produit';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProduitService {

//   produits: Produit[] = [
//     new Produit("Top Orange", 4200, 4800, 300, 6, 16, 'Brasserie', 'Cvide', 1,3, 'Jus', "Rene Tkc", null, 'adresse img'),
//     new Produit("Kadji", 7200, 7800, 300, 6, 16, 'Kadji', 'C12', 1, 7,'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Mutzig", 7200, 7800, 300, 6, 16, 'Brasserie', 'Cvide', 1,1, 'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Top Orange", 4200, 4800, 300, 6, 16, 'Brasserie', 'Cvide', 1,3, 'Jus', "Rene Tkc", null, 'adresse img'),
//     new Produit("33 Export", 7200, 7800, 300, 6, 16, 'Brasserie', 'C12', 1, 4,'Bière', "Rene Tkc", null, 'adresse img'),
//     new Produit("Top Orange", 4200, 4800, 300, 6, 16, 'Brasserie', 'Cvide', 1,3, 'Jus', "Rene Tkc", null, 'adresse img'),
//     new Produit("pamplemousse", 7200, 7800, 300, 6, 16, 'Kadji', 'C12', 1, 6,'Jus', "Rene Tkc", null, 'adresse img'),
//   ];

//   listeProduitsRavitailles: Array<Produit>=[];

//   listeProduitsRavitailleSubject: BehaviorSubject<Array<Produit>> = new BehaviorSubject<Array<Produit>>([]);
//   constructor() {
    
//    }
//   emitListProduitRavitailler(produit:Array<Produit>){
//     this.listeProduitsRavitailleSubject.next(produit)
//   }
//   addRavitailler(produit){
//      this.listeProduitsRavitailles.push(produit);
//      this.emitListProduitRavitailler(this.listeProduitsRavitailles);
//   }
//   // getRavitailler(){
//   //   return this.listeProduitsRavitailles;
//   // }
//   updateRavitailler(value){

//     const elt = this.listeProduitsRavitailles.find((elt,index) => {
//       if(elt.id == value.id){
//         this.listeProduitsRavitailles[index] = value;
//         this.emitListProduitRavitailler(this.listeProduitsRavitailles);
//       }
//     });
//   }

//   all(): Produit[]{
//     return this.produits;
//   }

//   search(searchText){
//       let all = this.produits.slice()
//       all = all.filter((item:any) => {
//         return item.nom.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.sousFamille.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
//      })
//      return all;
//   }



//   one(id: number): Produit 
//   {
//     const elt = this.produits.find((p) => p.id == id);
//     if( elt != null && elt != undefined ) return elt;
//     else return null;
//   }

//   add(produit: Produit): Produit{
//       console.log('ici')
//       produit.id = this.produits.length;
//       this.produits.push(produit);
//       return produit;
//   }

//   update(produit: Produit) 
//   {
//     let id: number = null;
//     const elt = this.produits.find((p, index, tab) => {
//       if (p.id == produit.id) id = index;
//       p.id == produit.id
//     });

//     this.produits[id] = produit;
//     // return this.produits[id];
//   }

//   haveFamille(famille: number): boolean{
//     const elt = this.produits.find((p) => p.catProduitID == famille);

//     if (elt !== undefined) {
//       return true;
//     }else{
//       return false;
//     }

//   }
//   haveSubFamille(sousFamille: string, famille: string): boolean{
//     const elt = this.produits.find((p) => p.sousFamille == sousFamille && p.famille == famille);

//     if (elt !== undefined) {
//       return true;
//     }else{
//       return false;
//     }

//   }
//   estRavitailler(nom: string): boolean{
//     const elt = this.listeProduitsRavitailles.find((p) => p.nom == nom);

//     if (elt !== undefined) {
//       return true;
//     }else{
//       return false;
//     }

//   }
//   delete(id:number){
//     for(let i = 0; i<=this.produits.length; i++){
//       if( this.produits[i].id == id){
//         console.log(this.produits[i])
//         this.produits.splice(i,1);
//         console.log(this.produits);
//         return true;
//       }
//     }
//     // this.produits.filter(function(p){ 
//     //           return p.id != id; 
//     // });
//     // console.log(this.produits)
//   }
// //   function arrayRemove(arr, value) { 
    
// //     return arr.filter(function(ele){ 
// //         return ele != value; 
// //     });
// // }

// }
