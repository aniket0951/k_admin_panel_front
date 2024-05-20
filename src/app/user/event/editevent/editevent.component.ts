
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ActivatedRoute } from '@angular/router';
import { GET_EVENT, GET_BRANCH } from 'src/app/utils/endpoints';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';


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
  end_time:string
}


@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})

export class EditeventComponent implements OnInit {
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
  eventData:any;
  eventId:any;
  start_date:any;

  imageUrls: string[] = [
    'https://i.pinimg.com/564x/65/f8/39/65f839b4c3a1e0f83cff7b8af464302c.jpg',
    'https://i.pinimg.com/564x/65/f8/39/65f839b4c3a1e0f83cff7b8af464302c.jpg',
    'https://i.pinimg.com/564x/65/f8/39/65f839b4c3a1e0f83cff7b8af464302c.jpg'
  ];

  videoUrls:string[] = [
    'https://maharajvideos.s3.ap-south-1.amazonaws.com/upload-3569884845.mp4',
    'https://maharajvideos.s3.ap-south-1.amazonaws.com/upload-3569884845.mp4',
    // 'https://maharajvideos.s3.ap-south-1.amazonaws.com/upload-3569884845.mp4',
    // 'https://maharajvideos.s3.ap-south-1.amazonaws.com/upload-3569884845.mp4',
    // 'https://maharajvideos.s3.ap-south-1.amazonaws.com/upload-3569884845.mp4',
    // 'https://maharajvideos.s3.ap-south-1.amazonaws.com/upload-3569884845.mp4',

  ];


  constructor(private appService: AppService, private route: ActivatedRoute) {
    this.start_date = new Date('2024-05-05');

  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['event']
    })

    this.getEvent()
  }

  getEvent():void{
    this.appService.getRequest(GET_EVENT + this.eventId).subscribe((response:any)=>{
      if(response) {
        this.eventData = response?.data
        // 
        this.start_date = this.convertToDate(this.eventData.start_date)
      }
    })
  }

  updateEvent():void{}

  convertToDate(dateString: string): Date {
    // Split the string into date and time parts
    const parts = dateString.split(' ');
    const datePart = parts[0];
    const timePart = parts[1];

    // Extract date components
    const dateComponents = datePart.split('-');
    const year = parseInt(dateComponents[0]);
    const month = parseInt(dateComponents[1]) - 1; // Month is zero-based
    const day = parseInt(dateComponents[2]);

    // Extract time components
    const timeComponents = timePart.split(':');
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseInt(timeComponents[2]);

    // Create Date object
    const date = new Date(year, month, day, hours, minutes, seconds);

    return date;
  }

  addImage():void{}

  deleteImage(image:any){
    console.log("Delete get called...");
  }
}
