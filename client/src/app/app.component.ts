import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts/index';
import { ChatService } from './chart.services';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent implements OnInit, OnDestroy {
  messages = [];
  messages2 = [];
  messages3 = [];
  messages4 = [];
  connection;
  message;
  options: Object;
  chart: Object;
  value = 0;
  value2;
  data;
  data2;
  data3;
  data4;

  width3 = 560;
  height3 = 400;
  type3 = 'line';
  dataFormat3 = 'json';
  dataSource3;

  width2 = 560;
  height2 = 400;
  type2 = 'column2d';
  dataFormat2 = 'json';
  dataSource2;


  width4 = 560;
  height4 = 400;
  type4 = "column2d";
  dataFormat4 = "json";
  dataSource4;


  @ViewChild('chartVar') refObj: any;
  constructor(private chatService: ChatService) { }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.renderChart();
    this.connection = this.chatService.getLiveData1().subscribe(message => {

      this.messages = [];
      console.log(message);
      this.messages.push(message);
      console.log(this.messages);

      this.value = this.messages[0].y;
      message['y'] = +message['y'];
      this.refObj.chart.series[0].addPoint(message, false);
      this.refObj.chart.redraw();
    });


    this.chatService.getLiveData2().subscribe(sampleMessage => {
      //
      // {
      //   "lable": "TOYT_GY",
      //   "value": "342151"
      // }
      const y = sampleMessage['y'].replace(/[{()}]/g, '').split(',');
      const result = {
        label: y[0],
        value: y[1],
      };

      if (this.messages2.length === 10) this.messages2 = [];
      if (this.messages2.length !== 10)this.messages2.push(result);
      // console.log(this.messages);

      this.data2 = {
        chart: {
          caption: 'Average Fine Amount For The Last 1 Min For Each Violation Type ',
          subcaption: 'When the total fine amount is greater than 50 USD',
          xaxisname: 'Violation Type',
          yaxisname: 'Average Fine Amount',
          theme: 'candy'
        },
        data: this.messages2
      };
      this.dataSource2 = this.data2;
      // this.value2 = this.messages[0].y;

    });

    this.chatService.getLiveData3().subscribe(ttt => {
      //
      // {
      //   "lable": "TOYT_GY",
      //   "value": "342151"
      // }
      const y = ttt['y'].replace(/[{()}]/g, '').split(',');
      const result = {
        label: y[0],
        value: y[1],
      };

      if (this.messages3.length === 10) this.messages3 = [];


      if (this.messages3.length !== 10){
        this.messages3.push(result);
      }
      console.log(this.messages3);

      this.data3 = {
        chart: {
          caption: 'Total number of violations for each violation type ',
          yaxisname: 'Number of Citations',
          subcaption: 'In last 30 seconds',
          numbersuffix: ' records',
          rotatelabels: '1',
          setadaptiveymin: '1',
          theme: 'candy'
        },
        data: this.messages3
      };
      this.dataSource3 = this.data3;
      // this.value2 = this.messages[0].y;

    });

    this.chatService.getLiveData4().subscribe(sampleMessage => {

      const y = sampleMessage['y'].replace(/[{()}]/g, '').split(',');
      const result = {
        label: y[0],
        value: y[1],
      };
      if (this.messages4.length === 5) this.messages4 = [];
      if (this.messages4.length !== 5)this.messages4.push(result);
      console.log(this.messages);

      this.data4 = {
        chart: {

          caption: 'Maximum fine paid by each state vehicle ',
          subcaption: 'Within last 1 min',
          xaxisname: 'State',
          yaxisname: 'Maximum Fine',
          numbersuffix: 'K',
          theme: 'candy'
        },
        data: this.messages4
      };
      this.dataSource4 = this.data4;
      // this.value2 = this.messages[0].y;

    });

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  renderChart() {
    this.options = {

      rangeSelector: {
        buttons: [{
          count: 1,
          type: 'minute',
          text: '1M'
        }, {
          count: 5,
          type: 'minute',
          text: '5M'
        }, {
          type: 'all',
          text: 'All'
        }],
        inputEnabled: false,
        selected: 0
      },

      title: {
        text: '<h2 style="color: mediumpurple">Parking Citation Records in last Minute<h2>'
      },
      xAxis: {
        opposite: true
      },
      yAxis: { opposite: true },
      exporting: {
        enabled: false
      },

      series: [{
        name: 'Live data 1',
        data: []
      },
      {
        name: 'Live data 2',
        data: []
      }
      ]

    };
  }


  loadChart(chartInstance) {
    this.chart = chartInstance;
  }

}
