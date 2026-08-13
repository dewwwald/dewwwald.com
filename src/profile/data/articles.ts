export interface Article {
  readonly title: string;
  readonly summary: string;
  readonly slug: string;
}

/** Newest first - the homepage's "Writing" teaser pulls the first two. */
export const articles: readonly Article[] = [
  {
    title: 'How to guide your LLM to communicate with your system',
    summary:
      'A local model turned natural language into a structured query in an hour, and that was only half the problem. The rest was making its output something an enterprise system could actually trust.',
    slug: 'how-to-guide-your-llm-to-communicate-with-your-system',
  },
  {
    title: 'Hiding an Attack Inside a Webpage, Then Asking My AI to Read It',
    summary:
      'I built a fake hacker site with hidden prompt-injection payloads and pointed my local AI’s web-search tool at it, to see whether it would act on instructions buried in fetched content.',
    slug: 'prompt-injection-fake-hacker-site',
  },
];
