import { Repository } from "archivum-typescript";
import { useEffect, useSyncExternalStore } from "react";

type Listener = () => void;

class RepositoryStore {
  private repo: Repository = new Repository();
  private version = 0;
  private listeners = new Set<Listener>();
  private pullPromise: Promise<void> | null = null;

  private emit() {
    this.version++;
    for (const listener of this.listeners) listener();
  }

  public subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot = () => this.version;

  public getRepository = () => this.repo;

  public ensurePulled() {
    if (!this.pullPromise) {
      this.pullPromise = this.pull().catch((err) => {
        this.pullPromise = null;
        throw err;
      });
    }
    return this.pullPromise;
  }

  public async push() {
    const data = this.repo.toJson();
    await fetch("http://localhost:3000/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  }

  public async refresh() {
    this.pullPromise = null;
    await this.ensurePulled();
  }

  public mutate(mutator: (repo: Repository) => void) {
    mutator(this.repo);
    this.emit();
  }

  private async pull() {
    const res = await fetch("http://localhost:3000/pull");
    const data = await res.text();
    this.repo = Repository.fromJson(data);
    this.emit();
  }
}

export const repositoryStore = new RepositoryStore();

export function useRepository(): Repository {
  useSyncExternalStore(
    repositoryStore.subscribe,
    repositoryStore.getSnapshot,
    repositoryStore.getSnapshot,
  );

  useEffect(() => {
    void repositoryStore.ensurePulled();
  }, []);

  return repositoryStore.getRepository();
}
