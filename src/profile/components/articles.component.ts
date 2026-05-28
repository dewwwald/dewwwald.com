import { Component } from '@angular/core';

@Component({
  selector: 'dewwwald-articles',
  standalone: true,
  template: `
    <main>
      <section class="section--padding articles-intro">
        <h1>
          what_ <small>I am thinking through</small>
        </h1>
        <p>
          This site started as a web portfolio when I left CubeZoo. That chapter mattered, but it is no longer the
          center of the story. The work I want to write about now lives closer to platform engineering, legacy
          modernization, AI-assisted developer workflows, and the human side of building software inside complex systems.
        </p>
        <p class="flush--bottom">
          The article archive is just getting started. For now, this is the place where I am collecting the ideas I keep
          returning to: pragmatic architecture, developer productivity, migration work, engineering judgment, and what
          good technical leadership looks like when the system is messy.
        </p>
      </section>
      <section class="section--padding bgc--base-ltr">
        <h1>
          resume_ <small>two ways to read my experience</small>
        </h1>
        <p>
          My current work sits between senior technical execution and engineering leadership. I keep separate resume
          versions for those conversations, both drawn from the same underlying work history.
        </p>
        <p class="flush--bottom">
          <a class="btn btn--base" href="/resume-full/Dewald_2026_Technical_Resume.md">technical resume</a>
          <a class="btn btn--base" href="/resume-full/Dewald_2026_Engineering_Manager_Resume.md">manager resume</a>
        </p>
      </section>
    </main>
  `,
})
export class ArticlesComponent {}
