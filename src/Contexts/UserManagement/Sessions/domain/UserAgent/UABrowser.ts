import { UserAgentParser } from "../../application/UserAgentParser";


export class UABrowser {
  readonly value: string;

  constructor(value: string) {
    const userAgent =  new UserAgentParser(value);
    const browser = userAgent.getBrowser()
    this.value = `${browser.name};${browser.version}`;
  }

  toString(): string {
    return this.value;
  }
}
