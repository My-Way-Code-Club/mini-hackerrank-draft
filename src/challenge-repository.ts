import fs from "node:fs";
import path from "node:path";

export interface ChallengeRepository {
  add(challenge: string): void;
  getAll(): string[];
}

export class FileChallengeRepository implements ChallengeRepository {
  private readonly filePath: string;

  constructor(filePath: string = path.join(process.cwd(), "challenges.json")) {
    this.filePath = filePath;
  }

  add(challenge: string): void {
    const currentChallenges = this.getAll();
    currentChallenges.push(challenge);
    fs.writeFileSync(this.filePath, JSON.stringify(currentChallenges, null, 2), "utf-8");
  }

  getAll(): string[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(this.filePath, "utf-8").trim();

    if (!fileContent) {
      return [];
    }

    try {
      const parsedContent: unknown = JSON.parse(fileContent);

      if (!Array.isArray(parsedContent)) {
        return [];
      }

      return parsedContent.filter((item): item is string => typeof item === "string");
    } catch {
      return [];
    }
  }
}
