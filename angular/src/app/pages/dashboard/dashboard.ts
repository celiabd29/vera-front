import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SurveyService, SurveyRow } from '../../services/survey.service';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';
import { environment } from '../../../environments/environment';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
]);

type ChartType = 'bar' | 'pie';

interface QuestionConfig {
  key: string; // clé EXACTE du Google Sheet
  title: string; // titre affiché
  subtitle: string; // sous-titre
  type: ChartType; // 'bar' ou 'pie'
  sectionKey?: string; // pour le menu de gauche (comportements, freins, ia, etc.)
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxEchartsDirective, VeraHeaderComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [provideEchartsCore({ echarts })],
})
export class DashboardComponent implements OnInit {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  surveyData: SurveyRow[] = [];
  headers: string[] = [];
  loading = true;
  error: string | null = null;

  // 👉 section sélectionnée dans le menu vertical (overview = tout)
  selectedSection: string = 'overview';

  // 👉 éléments du menu vertical (à gauche)
  sections = [
    { key: 'overview', label: 'Vue d’ensemble' },
    { key: 'profil', label: 'Profil des répondants' },
    { key: 'comportements', label: 'Comportements' },
    { key: 'freins', label: 'Freins & barrières' },
    { key: 'emotions', label: 'Émotions' },
    { key: 'ia', label: 'Rapport aux IA & à Vera' },
  ];

  // 🧀 Questions "profil" (camemberts)
  demographicQuestions: QuestionConfig[] = [
    {
      key: 'Parlons de toi, tu as',
      title: 'Tranche d’âge',
      subtitle: 'Répartition des répondants par tranche d’âge.',
      type: 'pie',
    },
    {
      key: 'Situation Professionnel',
      title: 'Situation professionnelle',
      subtitle: 'Répartition des répondants selon leur situation professionnelle.',
      type: 'pie',
    },
  ];

  // 📊 Toutes les autres questions en barres
  otherQuestions: QuestionConfig[] = [
    {
      key: 'Quand tu vois une info sur Instagram ou TikTok, tu as tendance à…',
      title: 'Comportement face aux infos qui apparaissent sur les réseaux sociaux.',
      subtitle: 'Réflexe face à une info sur Instagram ou TikTok',
      type: 'bar',
      sectionKey: 'comportements',
    },
    {
      key: 'Quelle émotion tu ressens face à une info choquante / virale ?',
      title: 'Réactions émotionnelles face à une info qui choque ou devient virale.',
      subtitle: 'Émotions face aux infos choquantes / virales',
      type: 'bar',
      sectionKey: 'emotions',
    },
    {
      key: 'Qu’est-ce qui te freine le plus quand il faut vérifier une info ?',
      title: 'Les principaux obstacles à la vérification des informations.',
      subtitle: 'Freins à la vérification d’info',
      type: 'bar',
      sectionKey: 'freins',
    },
    {
      key: 'Quand tu penses à la vérification d’info, c’est plutôt…',
      title: 'Perception de la vérification : utile, relou, trop longue, etc.',
      subtitle: 'Perception de la vérification d’info',
      type: 'bar',
      sectionKey: 'freins',
    },
    {
      key: 'Quand tu vois une info douteuse sur Instagram, tu fais quoi ?',
      title: 'Réflexes concrets quand une info semble suspecte.',
      subtitle: 'Réaction face à une info douteuse',
      type: 'bar',
      sectionKey: 'comportements',
    },
    {
      key: 'Si une info est bien designée (carrousel, reel stylé), tu la trouves automatiquement plus crédible ?',
      title: 'Est-ce qu’un contenu bien designé semble plus crédible ?',
      subtitle: 'Impact du design sur la crédibilité',
      type: 'bar',
      sectionKey: 'comportements',
    },
    {
      key: 'Est-ce que tu utilises des IA (ChatGPT, Gemini, etc.) pour t’informer ou comprendre un sujet ?',
      title: 'Part de ceux qui utilisent une IA pour mieux comprendre un sujet.',
      subtitle: 'Usage des IA pour s’informer',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'Quand une IA te donne une information, tu as tendance à…',
      title: 'Ce que les utilisateurs font après avoir reçu une réponse d’IA.',
      subtitle: 'Réflexe face à une info donnée par une IA',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'À quel point penses-tu que les IA peuvent se tromper ou créer des infos incorrectes (“hallucinations”) ?',
      title: 'Perception du risque d’erreur ou d’hallucination des IA.',
      subtitle: 'Confiance dans la fiabilité des IA',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'As-tu déjà vérifié une info donnée par une IA ?',
      title: 'Qui prend réellement le temps de vérifier ce que dit une IA.',
      subtitle: 'Vérification des infos fournies par une IA',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'Qu’est-ce qui te freine à vérifier une info venant d’une IA ?',
      title: 'Pourquoi on ne vérifie pas toujours ce que raconte l’IA.',
      subtitle: 'Freins à la vérification d’une info venant d’une IA',
      type: 'bar',
      sectionKey: 'freins',
    },
    {
      key: 'Est-ce que tu connais des outils de vérification d’information ?',
      title: 'Niveau de connaissance des outils de fact-checking.',
      subtitle: 'Connaissance des outils de vérification',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'Selon toi, un bon outil de vérification devrait être… (choix multiples)',
      title: 'Caractéristiques jugées importantes pour un outil de fact-checking.',
      subtitle: 'Ce qu’on attend d’un bon outil de vérification',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'Tu serais prêt·e à vérifier une info si ça prenait littéralement 2 secondes ?',
      title: 'Acceptabilité d’un geste de vérification ultra rapide.',
      subtitle: 'Prêt·e à vérifier si c’est ultra rapide',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'Un outil qui vérifie l’info pour toi, que ce soit un post Insta ou une réponse d’IA, ça te parle ?',
      title: 'Intérêt global pour un outil type Vera.',
      subtitle: 'Intérêt pour un outil qui vérifie à ta place',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'As-tu déjà entendu parler de Vera ?',
      title: 'Qui connaît déjà Vera avant le sondage.',
      subtitle: 'Notoriété actuelle de Vera',
      type: 'bar',
      sectionKey: 'ia',
    },
    {
      key: 'Sur une échelle de 1 à 5, à quel point l’idée “Tu gardes la flemme, Vera vérifie” te semble utile ?',
      title: 'Niveau perçu d’utilité du concept.',
      subtitle: 'Perception de l’idée “Tu gardes la flemme, Vera vérifie”',
      type: 'bar',
      sectionKey: 'ia',
    },
  ];

  chartOptions: Record<string, any> = {};

  constructor(private surveyService: SurveyService, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.surveyData = [];
    this.surveyService.getResults().subscribe({
      next: (data) => {
        this.surveyData = data || [];

        if (this.surveyData.length > 0) {
          this.headers = Object.keys(this.surveyData[0]);
        }

        this.buildAllCharts();
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('[Dashboard] Erreur API', err);
        this.error = 'Impossible de récupérer les résultats du sondage';
        this.loading = false;
      },
    });
  }

  private buildAllCharts(): void {
    if (!this.surveyData.length) return;

    for (const q of [...this.demographicQuestions, ...this.otherQuestions]) {
      if (!this.headers.includes(q.key)) {
        console.warn(`Question absente dans les données : "${q.key}"`);
        continue;
      }

      if (q.type === 'pie') {
        this.chartOptions[q.key] = this.buildPieChartFor(q.key);
      } else {
        this.chartOptions[q.key] = this.buildBarChartFor(q.key);
      }
    }
  }

  private buildCounts(questionKey: string): { labels: string[]; values: number[] } {
    const counts = new Map<string, number>();

    for (const row of this.surveyData) {
      const answer = row[questionKey] || 'Non renseigné';
      counts.set(answer, (counts.get(answer) || 0) + 1);
    }

    const labels = Array.from(counts.keys());
    const values = Array.from(counts.values());

    return { labels, values };
  }

  private buildBarChartFor(questionKey: string): any {
    const { labels, values } = this.buildCounts(questionKey);

    return {
      tooltip: { trigger: 'axis' },
      grid: { left: 140, right: 20, top: 10, bottom: 30 },
      xAxis: {
        type: 'value',
        name: 'Réponses',
      },
      yAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          width: 120,
          overflow: 'truncate', // coupe proprement si trop long
        },
      },
      series: [
        {
          type: 'bar',
          data: values,
          barWidth: 18,
          itemStyle: {
            borderRadius: 6,
            color: '#A4BAFF', // couleur Vera 💜
          },
        },
      ],
    };
  }

  private buildPieChartFor(questionKey: string): any {
    const { labels, values } = this.buildCounts(questionKey);

    return {
      tooltip: { trigger: 'item' },
      legend: {
        bottom: 0,
      },
      series: [
        {
          name: 'Réponses',
          type: 'pie',
          radius: '60%',
          center: ['50%', '45%'],
          data: labels.map((name, idx) => ({
            name,
            value: values[idx],
          })),
        },
      ],
    };
  }
}
