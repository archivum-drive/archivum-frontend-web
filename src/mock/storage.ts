import { Repository } from "archivum-typescript";

export class SingletonStorage {
  private static instance: Repository;

  public static getInstance(): Repository {
    if (!SingletonStorage.instance) {
      SingletonStorage.instance = new Repository();

      fetch("http://localhost:3000/pull")
        .then((res) => res.text())
        .then((data) => {
          SingletonStorage.instance = Repository.fromJson(data);
          console.log(SingletonStorage.instance.getAllNodes());
        });
    }

    return SingletonStorage.instance;
  }
}
