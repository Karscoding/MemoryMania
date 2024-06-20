import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-aggregate-data',
  standalone: true,
  imports: [],
  templateUrl: './aggregate-data.component.html',
  styleUrl: './aggregate-data.component.css'
})
export class AggregateDataComponent implements OnInit {
  aggregateData: any;
  players: any[] = [];
  dates: any[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadAggregateData();
    this.loadPlayers();
    this.loadDates();
  }

  loadAggregateData() {
    this.dataService.getAggregateData().subscribe(data => {
      this.aggregateData = data;
    });
  }

  loadPlayers() {
    this.dataService.getPlayers().subscribe(data => {
      this.players = data;
    });
  }

  loadDates() {
    this.dataService.getDates().subscribe(data => {
      this.dates = data;
    });
  }
}
