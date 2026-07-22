import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly themeService = inject(ThemeService);

  protected readonly isNavCollapsed = signal(true);
  protected readonly isDarkTheme = computed(() => this.themeService.theme() === 'dark');

  protected toggleNav(): void {
    this.isNavCollapsed.update((collapsed) => !collapsed);
  }

  protected closeNav(): void {
    this.isNavCollapsed.set(true);
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
