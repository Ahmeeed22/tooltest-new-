import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  userDate:any ;
  constructor( private router:Router , private _AuthService:AuthService ,private toaster:ToastrService,  private _formBuilder: FormBuilder,) {
    this._AuthService.getTreeData().subscribe({
      next: (res)=>{
        console.log(res);
        this.userDate=res.data
        console.log( this.userDate);
        
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

  testPlanForm = this._formBuilder.group({
    name: ['', [Validators.required]],
  });
  testCaseForm = this._formBuilder.group({
    name: ['', [Validators.required]],
  });

  addTestPlane(nameOfTestPlane:string){
    if (nameOfTestPlane.trim().length>0) {
      this.tree.push({name:nameOfTestPlane ,testcases:[]})
      this.testPlanForm.controls['name'].patchValue(' ')
    } else{
      this.testPlanForm.controls['name'].patchValue(null)
      this.toaster.error("faild add test plan with name empty")
    }
  }

  addTestCase(index:number){
    let ele=document.getElementById(`${index}test`)
    ele?.classList.toggle('d-none')
  }


  saveNode(x:any,index:number){
    if (x.trim().length>0) {
      this.tree[index].testcases.push({name:x})
      let ele=document.getElementById(`${index}test`)
      ele?.classList.toggle('d-none')
      this.itemValue.toArray().forEach(val => val.nativeElement.value = null);
      // this.router.navigate(['action-selection'], { state: { example: 'bar' } });
      this.router.navigate(['/ai'], { state: { example: this.tree , indexP:index ,user_id:this.user_id} });
      this.testCaseForm.controls['name'].patchValue(' ')
     }else{
      this.toaster.error("faild add test case with name empty");
      this.testCaseForm.controls['name'].patchValue(null)
     }
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
