import { UAParser } from "ua-parser-js";

export class UserAgent {
  readonly userAgent: string;
  readonly userAgentType: string;

  constructor(value: string) {
    this.userAgent = value;
    this.userAgentType = this.getUserAgentType(value);
  }

  private getUserAgentType(value: string): string {
    const parser = new UAParser(value);
    const device = parser.getDevice();
    return device.type ?? 'desktop';
  }
}
