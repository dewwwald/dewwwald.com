export interface NavItem {
  readonly title: string;
  readonly link: string;
  readonly fragment?: string;
}

export const navItems: readonly NavItem[] = [
  { title: 'Who', link: '/who' },
  { title: 'What', link: '/what' },
  { title: 'Why', link: '/why' },
  { title: 'When', link: '/when-where', fragment: 'when' },
  { title: 'Where', link: '/when-where', fragment: 'where' },
];
