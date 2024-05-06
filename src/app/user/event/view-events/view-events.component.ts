import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { TOTAL_EVENT_COUNT, GET_EVENTS, ADD_EVENT } from 'src/app/utils/endpoints';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';


interface FileData {
  file_type: string,
  file_path: string
}

interface Event {
  title: string,
  discription: string,
  location: string
  file_data: FileData[],
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string
}

AppService
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('700ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
  ]
})
export class ViewEventsComponent implements OnInit {
  newEvenet: Event = {
    title: '',
    discription: '',
    location: '',
    file_data: [],
    end_date: '',
    start_time: '',
    start_date: '',
    end_time: ''
  }
  displayedColumns: string[] = ['Title', 'Discription', 'Location', 'Start Date', 'End Date', 'Action'];
  dataSource!: MatTableDataSource<Event>;
  addStudentVisible: string = 'out';
  totalRecords: number = 0;
  defaultPageSize = 10;
  customPageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(private appService: AppService, private router: Router, private datePipe: DatePipe) {
    this.totalEvents()
    this.getEvent(0, this.defaultPageSize)

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  onPageChange(event: PageEvent) {

    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.getEvent(skip, limit)
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  toggleAddStudent(isFetch: boolean) {
    this.addStudentVisible = this.addStudentVisible === 'out' ? 'in' : 'out';
  }

  ngOnInit(): void { }

  addEvent(): void {
    let dateString = new Date(this.newEvenet.start_date);
    let start_date = this.formatDate(dateString)
    start_date = start_date.replace(/-/g, '');
    start_date += this.newEvenet.start_time.replace(/:/, '')

    let endDateString = new Date(this.newEvenet.end_date);
    let end_date = this.formatDate(endDateString);
    end_date = end_date.replace(/-/g, '');
    end_date += this.newEvenet.end_time.replace(/:/, '')

    this.newEvenet.start_date = start_date
    this.newEvenet.end_date = end_date

    this.appService.postRequest(ADD_EVENT, this.newEvenet).subscribe((response: any) => {
      if (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Event has been registered successfull !",
          showConfirmButton: false,
          timer: 1500
        });
        this.getEvent(0, this.defaultPageSize)
        this.toggleAddStudent(false)

      }
    })

  }

  totalEvents(): void {
    this.appService.getRequest(TOTAL_EVENT_COUNT).subscribe((response: any) => {
      if (response) {
        this.totalRecords = response?.data
      }
    })
  }

  getEvent(skip: number, limit: number): void {
    this.appService.getRequest(GET_EVENTS + skip + "/" + limit).subscribe((response: any) => {
      if (response) {
        this.dataSource = new MatTableDataSource(response?.data);
      }
    })
  }

  editEvent(event: any): void {
    this.router.navigate(['editevents'], { queryParams: { event: event?.id } })
  }
}
