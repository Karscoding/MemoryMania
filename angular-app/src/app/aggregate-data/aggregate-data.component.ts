import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-aggregate-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aggregate-data.component.html',
  styleUrls: ['./aggregate-data.component.css']
})
export class AggregateDataComponent implements OnInit {
  aggregateData: any[] = [];
  players: any[] = [];
  dates: any[] = [];

  constructor(private dataService: DataService) {}

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
    });
  }

  loadDates() {
    this.dataService.getDates().pipe(
      catchError(error => {
        console.error('Error fetching dates:', error);
        return throwError(error);
      })
    ).subscribe(data => {
      this.dates = Object.keys(data).map(key => ({ date: key, count: data[key] }));
    });
  }
}
