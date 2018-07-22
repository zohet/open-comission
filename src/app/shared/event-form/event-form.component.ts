import { Component, OnInit, Input } from '@angular/core';
import { Supervisor, Promoter } from '../../models/user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from '../../models/event';
import { BranchesService } from '../../branches/branches.service';
import { Branch } from '../../models/branch';
import { PromotersService } from '../../promoters/promoters.service';
import { SupervisorsService } from '../../supervisors/supervisors.service';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  @Input('employee') employee: Promoter | Supervisor;
  public eventForm: FormGroup;  
  public openSchedules = [
    { sched: '9:00 AM', valueTime: '9:00:00' },
    { sched: '10:00 AM', valueTime: '10:00:00' },
    { sched: '11:00 AM', valueTime: '11:00:00'},       
    { sched: '12:00 AM', valueTime: '12:00:00' }
  ];
  public closingSchedules = [
    { sched: '4:00 PM', valueTime: '16:00:00'},
    { sched: '5:00 PM', valueTime: '17:00:00'},
    { sched: '6:00 PM', valueTime: '18:00:00'},
    { sched: '7:00 PM', valueTime: '19:00:00'},
    { sched: '8:00 PM', valueTime: '20:00:00'},
    { sched: '9:00 PM', valueTime: '21:00:00'}            
  ];
  public branches: any;
  constructor(private _formBuilder:  FormBuilder,
              private _branchesService: BranchesService,
              private _promotersService: PromotersService,
              private _supervisorService: SupervisorsService) { }
  public event: Event;
  ngOnInit() {
    this.createForm();
    this.getListOfBranches();      
  }
  public createForm( ): void {
    this.eventForm = this._formBuilder.group({
        branchFormControl: ['', Validators.required],
        eventDateBeginFormControl: ['',Validators.required],
        eventDateExpFormControl: ['',Validators.required],
        hourWorkdayBeginFormControl: [''],
        hourWorkdayEndFormControl: ['']                                     
    })
  }
  public setNewEmployeeEvent(): void {
    const eventModelForm = this.eventForm.value;
    this.event = {
        branch: eventModelForm.branchFormControl as string,
        eventDateBegin: eventModelForm.eventDateBeginFormControl as Date,
        eventDateExp: eventModelForm.eventDateExpFormControl as Date,
        hourWorkdayBegin: eventModelForm.hourWorkdayBeginFormControl as string,
        hourWorkdayEnd: eventModelForm.hourWorkdayEndFormControl as string,
        promoter: this.employee.uid,
        status: true
    }
    if(this.employee.employeeKey === 'promoter'){
      this._promotersService.setNewEvent(this.event, this.employee);    
    }
    else if (this.employee.employeeKey === 'supervisor') {
      this._supervisorService.setNewEvent(this.event ,this.employee);
    } 
  }
  public getListOfBranches( ): void{
    this.branches = this._branchesService.branchesRef.valueChanges();
  }
}
