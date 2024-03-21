import { UserAgentParser } from "../../application/UserAgentParser";


export class UAOs {
  readonly name: string;
  readonly version: string;

  constructor(value: string) {
    const userAgent = new UserAgentParser(value);
    const os = userAgent.getOS();
    this.name = `${os.name}`;
    this.version = `${os.version}`;
  }

  toString() {
    return `${this.name};${this.version}`
  }
}
