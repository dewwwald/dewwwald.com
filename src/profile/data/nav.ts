export interface NavItem {
  readonly title: string;
  readonly href: string;
}

export const navItems: readonly NavItem[] = [
  { title: 'About', href: '/about#about' },
  { title: 'Experience', href: '/about#experience' },
  { title: 'Writing', href: '/articles' },
  { title: 'Contact', href: '/about#contact' },
];
