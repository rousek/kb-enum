import { Injectable } from '@angular/core';
import { filter, map, merge, Observable, of, Subject } from 'rxjs';
import { StoredItems } from './storage-ints';

/**
 * Typed localStorage with few features.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'local-storage';
  private storageProvider: Storage = window.localStorage;

  private data: Partial<StoredItems> = {};
  private update$: Subject<keyof StoredItems> = new Subject();

  constructor() {
      this.init();
  }

  init() {
      let strData = this.storageProvider.getItem(this.STORAGE_KEY);
      if (strData) {
          this.data = JSON.parse(strData);
      }
      this.data = this.data || {};
      for (let key in this.data) {
          this.update$.next(key as any);
      }
  }

  get<T extends keyof StoredItems>(key: T): StoredItems[T] | undefined {
      return this.data[key];
  }

  set<T extends keyof StoredItems>(key: T, value: StoredItems[T]) {
    this.data[key] = value;
    this.update$.next(key);
    this.save();
  }

  // Will return Observable that emits whenever value of given key changes
  watch<T extends keyof StoredItems>(key: T): Observable<StoredItems[T] | undefined> {
    const update = this.update$.asObservable().pipe(
      filter(k => k === key),
      map(k => this.data[key])
    );

    const initial = of(this.data[key]);
    return merge(initial, update);
  }

  save() {
    this.storageProvider.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  // Clears one key or whole storage.
  clear<T extends keyof StoredItems>(key?: T) {
    if (key) {
      delete this.data[key];
      this.update$.next(key);
      this.save();
    } else {
      this.storageProvider.removeItem(this.STORAGE_KEY);
      this.data = {};
    }
  }
}
