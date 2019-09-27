import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular2-highcharts/index';
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as Powercharts from 'fusioncharts/fusioncharts.powercharts';
import * as Candy from 'fusioncharts/themes/fusioncharts.theme.candy';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';





declare var require: any;
FusionChartsModule.fcRoot(FusionCharts, Powercharts, FusionTheme, Charts, Candy);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts/highstock')),
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
