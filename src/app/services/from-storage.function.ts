import {
  DestroyRef,
  effect,
  inject,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { SignalStorageService } from './signal-storage.service';

export const fromStorage = <TValue>(
  storageKey: string
): WritableSignal<TValue | null> => {
  const storage = inject(SignalStorageService);

  const initialValue = storage.getItem<TValue>(storageKey);

  const fromStorageSignal = signal<TValue | null>(initialValue);

  effect(() => {
    const updated = fromStorageSignal();
    untracked(() => storage.setItem(storageKey, updated));
  });

  const storageEventListener = (event: StorageEvent) => {
    const isWatchedValueTargeted = event.key === storageKey;
    if (!isWatchedValueTargeted) {
      return;
    }

    const currentValue = fromStorageSignal();
    const newValue = storage.getItem<TValue>(storageKey);

    const hasValueChanged = newValue !== currentValue;

    if (hasValueChanged) {
      fromStorageSignal.set(newValue);
    }
  };

  window.addEventListener('storage', storageEventListener);

  inject(DestroyRef).onDestroy(() => {
    window.removeEventListener('storage', storageEventListener);
  });

  return fromStorageSignal;
};
