import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


/**
 * @title Tree with checkboxes
*/
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})



export class ProfileComponent  {
  flage:boolean=true ;
  @ViewChildren('itemValue') itemValue!: QueryList<ElementRef>;
  tree :any[] =[]
  user_id:any;
  constructor( private router:Router , private _AuthService:AuthService) {
    this._AuthService.getTreeData().subscribe({
      next: (res)=>{
        console.log(res);
        this.user_id=res.data.id ;
        console.log(this.user_id);
        this.tree=res.data.test_plans
        console.log(res.data.test_plans);
        
      },
      error : (err)=>{
        console.log(err);
        
      }
    })
  }
  addTestPlane(nameOfTestPlane:any){
    this.tree.push({name:nameOfTestPlane ,testcases:[]})
  }

  addTestCase(index:number){
    let ele=document.getElementById(`${index}test`)
    ele?.classList.toggle('d-none')
  }


  saveNode(x:any,index:number){
    this.tree[index].testcases.push({name:x})
    let ele=document.getElementById(`${index}test`)
    ele?.classList.toggle('d-none')
    this.itemValue.toArray().forEach(val => val.nativeElement.value = null);
    // this.router.navigate(['action-selection'], { state: { example: 'bar' } });
    this.router.navigate(['/ai'], { state: { example: this.tree , indexP:index ,user_id:this.user_id} });
    
  }

  expandList(e:any,i:number){
    this.flage =!this.flage;
    if ( this.flage ) {
       document.getElementById(`${i}btn`)!.innerHTML=`<i class="fa-solid fa-arrow-right-long"></i>`
    } else {
       document.getElementById(`${i}btn`)!.innerHTML=`<i class="fa-solid fa-arrow-down"></i>`
      }
      let ele=document.getElementById(`${i}testCases`)
          ele?.classList.toggle('d-none')
          e.stopPropagation()
  }


}
