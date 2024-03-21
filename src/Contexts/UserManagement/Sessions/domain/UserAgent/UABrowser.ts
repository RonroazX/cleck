import { UserAgentParser } from "../../application/UserAgentParser";


export class UABrowser {
  readonly name: string;
  readonly version: string;

  constructor(value: string) {
    const userAgent =  new UserAgentParser(value);
    const browser = userAgent.getBrowser()
    this.name = `${browser.name}`;
    this.version = `${browser.version}`;
  }

  toString(): string {
    return `${this.name};${this.version}`;
  }
}
