import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/services/auth.service';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupCompComponent } from '../popup-comp/popup-comp.component';
import { MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';

export interface User {
  name: string;
  id?: Number;
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
  @ViewChild('table') table!: ElementRef;
  @ViewChild('tablerf') tablerf!: ElementRef;
  wizarFinalData: any = {};
  finalData: any;
  firstFormGroup: any;
  flag: boolean = false;
  flagTable: boolean = true;
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [],
  });

  thirdFormMain = this._formBuilder.group({
    testing_technique: ['rf', Validators.required],
  });
  isEditable = true;

  stepperOrientation: Observable<StepperOrientation>;

  mat_step_header: HTMLCollectionOf<Element> =
    document.getElementsByTagName('mat-step-header');

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
    use_case_description: [
      '',
      [Validators.required, Validators.maxLength(2000)],
    ],
    actor: ['', [Validators.required, Validators.maxLength(100)]],
    preconditions: ['', [Validators.required, Validators.maxLength(1000)]],
    flow: ['', [Validators.required, Validators.maxLength(4700)]],
  });
  newFormateFormAPI = this._formBuilder.group({
    yourData: ['', [Validators.required, Validators.maxLength(4700)]],
  });
  sh: any;
  example: any;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private toaster: ToastrService,
    private location: Location,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1000px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { example: string };
    this.example = state;

    console.log('this.example ', this.example);

    if (this.example?.example[this.example.indexP]?.project_title) {
      localStorage.setItem(
        'project_title',
        this.example?.example[this.example.indexP]?.project_title
      );
      localStorage.setItem(
        'project_description',
        this.example?.example[this.example.indexP]?.project_description
      );
      this.flag = true;
    }
    if (localStorage.getItem('project_title')) this.flag = true;
    this.firstFormGroup = this._formBuilder.group({
      project_title: [
        localStorage.getItem('project_title') || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      projectType: [''],
      desc: [
        localStorage.getItem('project_description') || '',
        [Validators.required, Validators.maxLength(2000)],
      ],
    });
  }
  options: User[] = [
    { name: 'Mary', id: 1 },
    { name: 'Shelley', id: 2 },
    { name: 'Igor', id: 3 },
  ];
  filteredOptions?: Observable<User[]>;
  x: any;
  formSubscription !: Subscription;
  ngOnInit() {
    this.formSubscription = this.thirdFormMain.valueChanges.subscribe(changes => {
      console.log('Form changes:', changes.testing_technique, this.thirdFormMain.value.testing_technique);
      // You can perform additional actions based on the form changes here
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement
      .querySelector('mat-step-header')
      .addEventListener('click', this.onClick.bind(this));
  }

  onClick(event: any) {
    event.preventDefault();
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  goForwardToComplet(stepper: MatStepper) {
    // console.log("ouuuuuuuuuuuuuuuuuuuter");

    if (this.sh === 1 && !(this.thirdFormMain.value.testing_technique == 'dt' || this.thirdFormMain.value.testing_technique == 'stt')) {
      console.log("111111111111");

      this.userStoryForm1.markAllAsTouched();
      if (this.userStoryForm1.valid && this.thirdFormMain.valid) {
        stepper.next();
      }
    }
    if (this.sh === 0 && !(this.thirdFormMain.value.testing_technique == 'dt' || this.thirdFormMain.value.testing_technique == 'stt')) {
      console.log("2222222222222");

      this.useCaseForm2.markAllAsTouched();
      if (this.useCaseForm2.valid && this.thirdFormMain.valid) {
        stepper.next();
      }
    }

    if (this.thirdFormMain.value.testing_technique == 'dt' || this.thirdFormMain.value.testing_technique == 'stt') {
      console.log("innnnnere", this.newFormateFormAPI.valid, this.thirdFormMain.valid);

      this.newFormateFormAPI.markAllAsTouched();
      if (this.newFormateFormAPI.valid && this.thirdFormMain.valid) {
        this.setFormGroupValid(this.userStoryForm1);
        this.setFormGroupValid(this.useCaseForm2);
        console.log("innnnnererrrrrrrrrrrrrrr", this.newFormateFormAPI.valid, this.thirdFormMain.valid);

        stepper.next();
      }
    }
  }
  resetWizard() {
    this.getheringData();
  }
  result: any;
  getheringData() {
    this.spinnerService.show();
    const { project_title, desc: project_description } =
      this.firstFormGroup.value;
    this.wizarFinalData = {
      project_title,
      project_description,
      ...this.example.example[this.example.indexP],
      user_id: this.example.user_id,
    };
    this.wizarFinalData['plan_id'] = this.wizarFinalData['id'];
    delete this.wizarFinalData['id'];
    this.wizarFinalData['test_plan_name'] = this.wizarFinalData['name'];
    delete this.wizarFinalData['name'];
    this.wizarFinalData['test_cases'] = this.wizarFinalData['testcases'];
    delete this.wizarFinalData['testcases'];
    if (!this.wizarFinalData['plan_id']) delete this.wizarFinalData['plan_id'];

    delete this.wizarFinalData['indexP'];
    var selectedTech: any;
    var extraData: any;
    if (this.thirdFormMain.value.testing_technique == 'dt' || this.thirdFormMain.value.testing_technique == 'stt') {
      selectedTech = this.newFormateFormAPI.value;
      extraData={
        use_case_title: "null",
        as_a: "null",
        i_want: "null",
        so_that: "null",
        user_flow: "null"
      }
      // this.finalData={...this.finalData,...extraData} ;

      this.finalData = {
        format: 'user_story',
        ...this.thirdFormMain.value,
        project_title,
        project_description : `${project_description} ${selectedTech?.yourData}`,
        ...extraData
      };

    } else {

      selectedTech = this.sh
        ? this.userStoryForm1.value
        : this.useCaseForm2.value;

        this.finalData = {
          format: 'user_story',
          ...this.thirdFormMain.value,
          ...selectedTech,
          project_title,
          project_description : `${project_description}`,
          
        };
    }
    this.finalData['project_name'] = this.finalData['project_title'];
    delete this.finalData['project_title'];
    let userDataUpdate = {
      source: 'front',
      name: this.example.name,
      user_id: this.example.user_id,
    };
    console.log('dealingAi ', this.finalData);
    // console.log('addwizard ', this.wizarFinalData);
    // console.log('userDataUpdate ', userDataUpdate);
    console.log("this.finalData", this.wizarFinalData);

    this._AuthService.dealingAi(this.finalData).subscribe({
      next: (res) => {
        console.log('dealingAi res ', res);
        this.result = res.data;
        this.flagTable = !this.flagTable;
        this._AuthService.addwizard(this.wizarFinalData).subscribe({
          next: (res) => {
            console.log('addwizard res', res);
          },
          error: (err) => {
            console.log('addwizard err ', err);

            this.spinnerService.hide();
          },
        });
        this._AuthService.updateUser(userDataUpdate).subscribe({
          next: (res) => {
            console.log('updateUser res ', res);

            this.spinnerService.hide();
          },
          error: (err) => {
            console.log('updateUser err ', err);

            this.spinnerService.hide();
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    localStorage.removeItem('project_title');
    localStorage.removeItem('project_description');
  }

  fireEvent() {
    // if (this.example?.subscripted) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.thirdFormMain.value.testing_technique != 'rf' ? this.table.nativeElement : this.tablerf.nativeElement
    );
    /* new format */
    var fmt = '0.00';
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var fmt = '@';
    wb.Sheets['Sheet1']['F'] = fmt;
    /* save to file */
    XLSX.writeFile(
      wb,
      `_export_ ${this.wizarFinalData.test_cases[
        this.wizarFinalData.test_cases.length - 1
      ].name
      }.xlsx`
    );
    // }
    //  else {
    //   this.toaster.info(
    //     'To enable this feature Please subscribe'
    //   );
    //   setTimeout(() => {
    //     window.open(
    //       `https://casesfly.ai/casefly-pricing-plan/?case=${this.example.user_id}`,
    //       '_blank'
    //     );
    //   }, 1500);
    // }
  }
  // prevent space at first on input
  preventSpaceAtBegging(event: any) {
    if (event.target.value.length >= 1) {
      console.log(true);
    } else {
      event.preventDefault();
    }
  }
  back(): void {
    localStorage.removeItem('project_title');
    localStorage.removeItem('project_description');
    this.location.back();
  }

  testt(e: any, controlName: string, formGroupName: FormGroup) {
    // console.log(formGroupName);
    // if (!e.target.value) {
    //  formGroupName.controls[controlName].patchValue(null) ;
    //  this.toaster.warning("Note please English Only check your english grammar for best results")
    // }
  }

  onOptionClick(e: MouseEvent) {
    console.log('tetstst');

    !this.example?.subscripted
      ? this.toaster.info('To enable this feature Please subscribe')
      : '';
  }
  // translateCorrectSer("message",'translateCorrectSer')
  // translateCorrectSer("messsage",'CorrectSpellingInText')
  translateCorrectSer(e: any, value: any, type: string) {
    e.preventDefault();
    if (value.length > 0) {
      this.spinnerService.show();
      this._AuthService
        .translteCorrectSer({
          request_type: type,
          message: value,
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.spinnerService.hide();
            this.openAlert(res.data);
          },
          error: (err) => {
            this.spinnerService.hide();
            console.log(err);
          },
        });
    } else {
      this.toaster.warning('text is empty');
    }
  }

  openAlert(message: string) {
    // const snackBarRef = this.snackBar.open(message, 'Close', {
    //   duration: 0, // Set duration to 0 for a manual close
    //   horizontalPosition: 'center',
    //   verticalPosition: 'top',
    //   panelClass: ['custom-alert'] // Apply custom CSS class
    // });

    // // Add a click listener to close the snackbar manually
    // snackBarRef.onAction().subscribe(() => {
    //   snackBarRef.dismiss();
    // });
    // *******************************
    if (message.length > 0) {
      const dialogRef = this.dialog.open(PopupCompComponent, {
        width: '60%',
        disableClose: true,
        data: message,
      });
    } else {
      this.toaster.warning('text is empty');
    }

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getAllServices()
    // });
  }
  feedback() {
    window.open(`https://casesfly.ai/rate-win/`, "_blank");
  }

  setFormGroupValid(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control instanceof FormGroup) {
        // If the control is a FormGroup, recursively set its controls to valid
        this.setFormGroupValid(control);
      } else if (control) {
        // Set a valid value for each control
        if (control.validator) {
          const validationErrors = control.validator({} as AbstractControl);
          if (validationErrors) {
            if (validationErrors['required']) {
              control.setValue('valid value');
            }
            if (validationErrors['maxlength']) {
              control.setValue('a'.repeat(validationErrors['maxlength'].requiredLength));
            }
            // Add more conditions based on the types of validators you are using
          } else {
            control.setValue('valid value');
          }
        } else {
          control.setValue('valid value');
        }
      }
    });
  }

}
