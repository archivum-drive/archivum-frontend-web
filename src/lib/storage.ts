import { Repository } from "archivum-typescript";
import { useEffect, useSyncExternalStore } from "react";

type Listener = () => void;

export type RepoStatus = "loading" | "ready";

class RepositoryStore {
  private repo: Repository = new Repository();
  private version = 0;
  private listeners = new Set<Listener>();
  private pullPromise: Promise<void> | null = null;

  private status: RepoStatus = "loading";

  private emit() {
    this.version++;
    for (const listener of this.listeners) listener();
  }

  public subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  public getSnapshot = () => this.version;

  public getRepository = () => this.repo;
  public getStatus = () => this.status;

  public ensurePulled() {
    if (!this.pullPromise) {
      this.status = "loading";
      this.emit();

      this.pullPromise = this.pull().then(() => {
        this.status = "ready";
        this.emit();
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

export function useRepository() {
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

export function useRepositoryState() {
  useSyncExternalStore(
    repositoryStore.subscribe,
    repositoryStore.getSnapshot,
    repositoryStore.getSnapshot,
  );

  useEffect(() => {
    void repositoryStore.ensurePulled().catch(() => {});
  }, []);

  return {
    repository: repositoryStore.getRepository(),
    status: repositoryStore.getStatus(),
    refresh: () => repositoryStore.refresh(),
  };
}
