import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fromStorage } from './services/from-storage.function';
import { DOCUMENT, JsonPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

type THEME = 'light' | 'dark';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  document: Document = inject(DOCUMENT);
  // public constructor(@Inject(DOCUMENT) doc: Document) {
  //   console.log(doc.documentElement.setAttribute('data-bs-theme', 'dark'));
  // }

  readonly preferredTheme1 = fromStorage<THEME>('preferred-theme');
  togglePreferredTheme(event: Event): void {
    const ischecked = (<HTMLInputElement>event.target).checked;
    this.preferredTheme1.update((current) => {
      const newValue = ischecked ? 'dark' : 'light';
      this.document.documentElement.setAttribute('data-bs-theme', newValue);
      return newValue;
    });
  }

  readonly preferredTheme2 = fromStorage<THEME>('preferred-theme');
  setLightTheme(): void {
    this.preferredTheme2.set('light');
    this.document.documentElement.setAttribute('data-bs-theme', 'light');
  }

  setDarkTheme(): void {
    this.preferredTheme2.set('dark');
    this.document.documentElement.setAttribute('data-bs-theme', 'dark');
  }
}
