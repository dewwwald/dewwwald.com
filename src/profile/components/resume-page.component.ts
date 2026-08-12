import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { marked } from 'marked';

interface ResumeConfig {
  readonly label: string;
  readonly path: string;
  readonly rawPath: string;
}

const resumes: Record<string, ResumeConfig> = {
  technical: {
    label: 'Technical resume',
    path: 'resume-full/Dewald_2026_Technical_Resume.md',
    rawPath: '/resume-full/Dewald_2026_Technical_Resume.md',
  },
  'engineering-manager': {
    label: 'Engineering manager resume',
    path: 'resume-full/Dewald_2026_Engineering_Manager_Resume.md',
    rawPath: '/resume-full/Dewald_2026_Engineering_Manager_Resume.md',
  },
};

@Component({
  selector: 'dewwwald-resume-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  template: `
    <main class="resume-page">
      <nav class="resume-page__nav" aria-label="Resume navigation">
        <a routerLink="/resume/technical">Technical</a>
        <a routerLink="/resume/engineering-manager">Engineering manager</a>
        <a [href]="currentResume.rawPath">Raw Markdown</a>
      </nav>

      <article class="resume-document" *ngIf="resumeHtml$ | async as resumeHtml; else loading" [innerHTML]="resumeHtml"></article>

      <ng-template #loading>
        <article class="resume-document">
          <h1>{{ currentResume.label }}</h1>
          <p>Loading resume...</p>
        </article>
      </ng-template>
    </main>
  `,
})
export class ResumePageComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  protected currentResume = resumes['technical'];
  protected resumeHtml$!: Observable<SafeHtml>;

  ngOnInit(): void {
    marked.use({
      gfm: true,
      breaks: false,
    });

    this.resumeHtml$ = this.route.paramMap.pipe(
      map((params) => resumes[params.get('type') ?? 'technical'] ?? resumes['technical']),
      switchMap((resume) => {
        this.currentResume = resume;
        return this.http.get(resume.path, { responseType: 'text' }).pipe(
          map((markdown) => marked.parse(markdown) as string),
          map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
          catchError(() =>
            of(this.sanitizer.bypassSecurityTrustHtml(`<h1>${resume.label}</h1><p>The resume could not be loaded.</p>`)),
          ),
        );
      }),
    );
  }
}
