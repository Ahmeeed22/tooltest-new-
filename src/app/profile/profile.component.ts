import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Location } from '@angular/common';


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
  name:any;
  userDate:any ;
  subscripted:boolean=false;
  cookie:any ;
  sub_subscription_plans:any=[
                                    {
                                        id: 4,
                                        click_count: "10",
                                        user_id: "8",
                                        pay_date: "2023-03-25 09:04:06",
                                        pay_price: "10",
                                        pay_status: "success",
                                        created_at: "2023-03-24T20:49:14.000000Z",
                                        updated_at: "2023-03-24T20:49:14.000000Z"
                                }                       ]
  constructor( private router:Router , private _AuthService:AuthService ,private toaster:ToastrService,  private _formBuilder: FormBuilder,private cookieService: CookieService , private location: Location) {
   
    this.getAllCookies()
    if (this.cookie['decrypt-user']) {
      this._AuthService.getTreeData({encrypted_data:this.cookie['decrypt-user']}).subscribe({
        next: (res)=>{
          this.userDate=res.data
          console.log( this.userDate);
          this._AuthService.userName.next(this.userDate?.name)
          this.user_id=res?.data.id ;
          this.name=res?.data?.name
          this.tree=res?.data?.test_plans
          this.subscripted=res.data?.sub_subscription_plans?.length>0?true:false
        }
      })
    }

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
      this.userDate?.test_plans[index]
      for (let indexx = 0; indexx < this.userDate?.test_plans[index].testcases.length; indexx++) {
        if (x ==  this.userDate?.test_plans[index].testcases[indexx].name) {
          this.toaster.error('this name exit please trying with another name')
          return ;
        } 
      }
      console.log('no error');
        if ((this.userDate?.sub_subscription_plans.length==0 && this.userDate?.limit_test_case==0)||this.userDate?.limit_test_case==0) {
          
          window.open(`https://casesfly.ai/pricing-plan/?case=${this.user_id}`, "_blank");
        } else {
          this.tree[index].testcases.push({name:x})
          let ele=document.getElementById(`${index}test`)
          ele?.classList.toggle('d-none')
          this.itemValue.toArray().forEach(val => val.nativeElement.value = null);
          this.router.navigate(['/ai'], { state: { example: this.tree , indexP:index ,user_id:this.user_id,name:this.name,subscripted:this.subscripted} });
          this.testCaseForm.controls['name'].patchValue(' ')
        }
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
  // prevent space at first on input
  preventSpaceAtBegging(event:any){
    if (event.target.value.length>=1) {
      // console.log(true);
    } else {
      console.log(event.target.value.length);
      event.preventDefault();
    }
  }

  getAllCookies() {
    const cookies = document.cookie.split(';');
    const cookieObj :any= {};
  
    cookies.forEach(cookie => {
      console.log(cookie);
      
      const [key, value] = cookie.split('=');
      cookieObj[key.trim()] = decodeURIComponent(value);
    });
    // console.log("testtstst",cookieObj);
    this.cookie={...cookieObj} ;
    if (this.cookie['decrypt-user']) {
      console.log("true");
    }else{
      console.log("no cooooooooooookie");
      this.toaster.error("faild login please login again")
      window.open("https://casesfly.ai/",'_self');
    }
    return cookieObj;
  }
}
