import { UserAgentParser } from "../../application/UserAgentParser";

export class UAEngine {
  readonly value: string;

  constructor(value: string) {
    const userAgent = new UserAgentParser(value);
    const engine = userAgent.getEngine();
    this.value = `${engine}`;
  }

  toString(): string {
    return this.value;
  }
}
