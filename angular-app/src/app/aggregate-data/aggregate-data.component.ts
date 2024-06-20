import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-aggregate-data',
  standalone: true,
  imports: [AgChartsAngular, CommonModule],
  templateUrl: './aggregate-data.component.html',
  styleUrls: ['./aggregate-data.component.css']
})
export class AggregateDataComponent implements OnInit {
  aggregateData: any;
  players: any[] = [];
  dates: any[] = [];

  // Chart options
  public gamesChartOptions: AgChartOptions;
  public playersChartOptions: AgChartOptions;
  public datesChartOptions: AgChartOptions;

  constructor(private dataService: DataService) {
    // Initialize chart options
    this.gamesChartOptions = {
      data: [],
      series: [{ type: 'bar', xKey: 'label', yKey: 'value', yName: 'Total Games' }]
    };

    this.playersChartOptions = {
      data: [],
      series: [{ type: 'bar', xKey: 'username', yKey: 'count', yName: 'Players' }]
    };

    this.datesChartOptions = {
      data: [],
      series: [{ type: 'bar', xKey: 'date', yKey: 'count', yName: 'Games per Day' }]
    };
  }

  ngOnInit(): void {
    this.loadAggregateData();
    this.loadPlayers();
    this.loadDates();
  }

  loadAggregateData() {
    this.dataService.getAggregateData().pipe(
      catchError(error => {
        console.error('Error fetching aggregate data:', error);
        return throwError(error);
      })
    ).subscribe(data => {
      this.aggregateData = data;
      this.gamesChartOptions = {
        ...this.gamesChartOptions,
        data: [{ label: 'Total Games', value: this.aggregateData.totalGames }]
      };
    });
  }

  loadPlayers() {
    this.dataService.getPlayers().pipe(
      catchError(error => {
        console.error('Error fetching players:', error);
        return throwError(error);
      })
    ).subscribe(data => {
      this.players = data;
      this.playersChartOptions = {
        ...this.playersChartOptions,
        data: this.players.map(player => ({ username: player.username, count: 1 }))
      };
    });
  }

  loadDates() {
    this.dataService.getDates().subscribe(
      data => {
        console.log('Dates response:', data);  // Log the response to check the format
        if (Array.isArray(data)) {
          this.dates = data;
          this.datesChartOptions = {
            ...this.datesChartOptions,
            data: this.dates.map(date => ({ date: date.date, count: date.count }))
          };
        } else {
          console.error('Expected an array but received:', data);
        }
      },
      error => {
        console.error('Error fetching dates:', error);
      }
    );
  }
}
