import { inject, Injectable } from '@angular/core';
import { STORAGE } from '../signal-storage.token';

@Injectable({
  providedIn: 'root',
})
export class SignalStorageService {
  readonly #storage = inject(STORAGE);

  getItem<T>(key: string): T | null {
    const rawValue = this.#storage.getItem(key);
    return rawValue === null ? null : JSON.parse(rawValue);
  }

  setItem<T>(key: string, value: T): void {
    const stringifiedValue = JSON.stringify(value);
    this.#storage.setItem(key, stringifiedValue);

    const storageEvent = new StorageEvent('storage', {
      key: key,
      newValue: stringifiedValue,
      storageArea: this.#storage,
    });
    window.dispatchEvent(storageEvent);
  }
}
