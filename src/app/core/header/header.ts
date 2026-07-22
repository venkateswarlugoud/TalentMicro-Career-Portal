import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly isNavCollapsed = signal(true);

  protected toggleNav(): void {
    this.isNavCollapsed.update((collapsed) => !collapsed);
  }

  protected closeNav(): void {
    this.isNavCollapsed.set(true);
  }
}
