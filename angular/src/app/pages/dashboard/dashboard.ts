import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyService, SurveyRow } from '../../services/survey.service';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  surveyData: SurveyRow[] = [];
  headers: string[] = [];
  loading = true;
  error: string | null = null;

  // options pour ECharts
  questionKey = 'Quand tu vois une info sur Instagram ou TikTok, tu as tendance à…';
  chartOption: any = null;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyService.getResults().subscribe({
      next: (data) => {
        this.surveyData = data || [];

        if (this.surveyData.length > 0) {
          this.headers = Object.keys(this.surveyData[0]);
        }

        this.buildChart();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Impossible de récupérer les résultats du sondage';
        this.loading = false;
      }
    });
  }

  private buildChart() {
    if (!this.surveyData.length || !this.headers.includes(this.questionKey)) {
      return;
    }

    const counts = new Map<string, number>();

    for (const row of this.surveyData) {
      const answer = row[this.questionKey] || 'Non renseigné';
      counts.set(answer, (counts.get(answer) || 0) + 1);
    }

    const labels = Array.from(counts.keys());
    const values = Array.from(counts.values());

    this.chartOption = {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { interval: 0, rotate: 20 }
      },
      yAxis: {
        type: 'value',
        name: 'Nombre de réponses'
      },
      series: [
        {
          type: 'bar',
          data: values
        }
      ]
    };
  }
}
