import { Injectable } from "@angular/core";

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

@Injectable({
  providedIn: "root",
})
export class CacheService {
  private storage = window.localStorage;

  get<T>(key: string): T | null {
    const entryJson = this.storage.getItem(key);

    if (!entryJson) return null;

    try {
      const entry: CacheEntry<T> = JSON.parse(entryJson);

      if (Date.now() > entry.expiry) {
        this.storage.removeItem(key);
        return null;
      }

      return entry.value;
    } catch {
      this.storage.removeItem(key);

      return null;
    }
  }

  set<T>(key: string, value: T, ttl: number = 7200000): void {
    const expiry = Date.now() + ttl;

    const entry: CacheEntry<T> = { value, expiry };

    this.storage.setItem(key, JSON.stringify(entry));
  }

  clear(key: string): void {
    this.storage.removeItem(key);
  }

  clearAll(): void {
    this.storage.clear();
  }
}
