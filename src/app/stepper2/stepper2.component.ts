import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/services/auth.service';
import * as XLSX from "xlsx";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
export interface User {
  name: string;
  id?: Number
}
@Component({
  selector: 'app-stepper2',
  templateUrl: './stepper2.component.html',
  styleUrls: ['./stepper2.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})

export class Stepper2Component implements OnInit, AfterViewInit {
  @ViewChild("table") table!: ElementRef;
  wizarFinalData: any = {}
  finalData: any;
  firstFormGroup: any;
  flag: boolean = false;
  flagTable: boolean = true
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [],
  });

  thirdFormMain = this._formBuilder.group({
    testing_technique: ['rf', Validators.required]
  })
  isEditable = true;

  stepperOrientation: Observable<StepperOrientation>;

  mat_step_header: HTMLCollectionOf<Element> = document.getElementsByTagName('mat-step-header')

  isChecked: boolean = true;
  userStoryForm1 = this._formBuilder.group({
    format: ['user_story'],
    use_case_title: ['', [Validators.required, Validators.maxLength(100)]],
    as_a: ['', [Validators.required, Validators.maxLength(100)]],
    i_want: ['', [Validators.required, Validators.maxLength(3000)]],
    so_that: ['', [Validators.required, Validators.maxLength(2200)]],
    user_flow: ['', [Validators.required, Validators.maxLength(2500)]],
  });
  useCaseForm2 = this._formBuilder.group({
    format: ['use_case'],
    use_case_title: ['', [Validators.required, Validators.maxLength(100)]],
    use_case_description: ['', [Validators.required, Validators.maxLength(3500)]],
    actor: ['', [Validators.required, Validators.maxLength(100)]],
    preconditions: ['', [Validators.required, Validators.maxLength(1700)]],
    flow: ['', [Validators.required, Validators.maxLength(2500)]]

  });
  sh: any
  example: any;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService
    ,private toaster:ToastrService,
    private location: Location
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { example: string };
    this.example = state;
    if (this.example?.example[this.example.indexP]?.project_title) {
      localStorage.setItem('project_title', this.example?.example[this.example.indexP]?.project_title)
      localStorage.setItem('project_description', this.example?.example[this.example.indexP]?.project_description)
      this.flag = true
    }
    if (localStorage.getItem('project_title')) this.flag = true
    this.firstFormGroup = this._formBuilder.group({
      project_title: [localStorage.getItem('project_title') || '', [Validators.required, Validators.maxLength(100)]],
      projectType: ['',],
      desc: [localStorage.getItem('project_description') || '', [Validators.required, Validators.maxLength(2000)]]
    });
  }
  options: User[] = [{ name: 'Mary', id: 1 }, { name: 'Shelley', id: 2 }, { name: 'Igor', id: 3 }];
  filteredOptions?: Observable<User[]>;
  x: any;
  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('mat-step-header')
      .addEventListener('click', this.onClick.bind(this));
  }

  onClick(event: any) {
    event.preventDefault()
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  goForwardToComplet(stepper: MatStepper) {
    if (this.sh === 1) {
      this.userStoryForm1.markAllAsTouched()
      if (this.userStoryForm1.valid && this.thirdFormMain.valid) {
        stepper.next()
      }
    }
    if (this.sh === 0) {
      this.useCaseForm2.markAllAsTouched()
      if (this.useCaseForm2.valid && this.thirdFormMain.valid) {
        stepper.next()
      }
    }
  }
  resetWizard() {
    this.getheringData()
  }
  result: any;
  getheringData() {
    this.spinnerService.show()
    const { project_title, desc: project_description } = this.firstFormGroup.value;
    this.wizarFinalData = { project_title, project_description, ...this.example.example[this.example.indexP], user_id: this.example.user_id }
    console.log(this.wizarFinalData);
    this.wizarFinalData['plan_id'] = this.wizarFinalData['id'];
    delete this.wizarFinalData['id'];
    this.wizarFinalData['test_plan_name'] = this.wizarFinalData['name'];
    delete this.wizarFinalData['name'];
    this.wizarFinalData['test_cases'] = this.wizarFinalData['testcases'];
    delete this.wizarFinalData['testcases'];
    if (!this.wizarFinalData['plan_id']) delete this.wizarFinalData['plan_id'];
    //  this.wizarFinalData['test_cases'][this.wizarFinalData['test_cases'].length].description="test"
    delete this.wizarFinalData['indexP'];
    var selectedTech = this.sh ? this.userStoryForm1.value : this.useCaseForm2.value
    this.finalData = { format: this.sh ? 'user_story' : 'use_case', ...this.thirdFormMain.value, project_title, project_description, ...selectedTech }
    this.finalData['project_name'] = this.finalData['project_title'];
    delete this.finalData['project_title'];
    let userDataUpdate={source:"front",name:this.example.name, user_id: this.example.user_id}
    this._AuthService.dealingAi(this.finalData).subscribe({
      next: (res) => {
        console.log(res.data);
        this.result = res.data
        this.flagTable = !this.flagTable
        this._AuthService.addwizard(this.wizarFinalData).subscribe({
          next: (res) => {
            console.log('this.wizarFinalData', this.wizarFinalData,res);
          },
          error: (err) => {
            this.spinnerService.hide()
            console.log(err);
          }
        })
        this._AuthService.updateUser(userDataUpdate).subscribe({
          next:(res)=>{
            console.log(res);
            this.spinnerService.hide()
          },
          error:(err)=>{
            this.spinnerService.hide()
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
    localStorage.removeItem("project_title");
    localStorage.removeItem("project_description")
  }

  fireEvent() {
    if (this.example?.subscripted) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
        this.table.nativeElement
      );
      /* new format */
      var fmt = "0.00";
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      var fmt = "@";
      wb.Sheets["Sheet1"]["F"] = fmt;
      /* save to file */
      XLSX.writeFile(wb, `_export_ ${this.wizarFinalData.test_cases[this.wizarFinalData.test_cases.length - 1].name}.xlsx`);
    } else {
      this.toaster.info('You are not subscribed now, you will be taken to our pricing page')
      setTimeout(() => {
        window.open(`https://casesfly.ai/pricing-plan/?case=${this.example.user_id}`, "_blank");
      }, 1500);
    }
  }
    // prevent space at first on input
    preventSpaceAtBegging(event:any){
      if (event.target.value.length>=1) {
        console.log(true);
      } else {
        console.log(event.target.value.length);
        event.preventDefault();
      }
    }
    back(): void {
      this.location.back()
    }
}
