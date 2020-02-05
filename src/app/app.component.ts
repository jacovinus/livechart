import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketService]
})
export class AppComponent implements OnInit{
  title = 'livechart';
  chart : Chart;
  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  tabledata = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    // ... list of items
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
    { 
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 3,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    // ... list of items
    {
      id: 4,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    },
  ];
constructor(
  private socketService : SocketService
){
}
  ngOnInit(){
    this.socketService.listen('dataUpdate').subscribe(
      data => {
      console.log(data);
      this.chart.data.datasets[0].data = data;
      this.chart.data.datasets[1].data = data;
       this.chart.update();
      },
      err => {
        console.log(err)
      }
    )
  this.chart = new Chart('canvas',{
  type: 'bar',
  options: {
    responsive : true,
    title : {
      display: true,
      text: `Realtime Charts`
    },
  },
  data : {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        type: 'bar',
        label: 'value',
       // data:[],
        backgroundColor: '#3f3fbf',
        fill: false
      },
      {
        type: 'line',
        label: 'Linechart',
        data: [22,15,23,45,22,3,56,76,34,25,13,52],
        backgroundColor: '#faba5c',
        borderColor: 'red',
        fill:false
      }
    ]
  }
})

  }
}
