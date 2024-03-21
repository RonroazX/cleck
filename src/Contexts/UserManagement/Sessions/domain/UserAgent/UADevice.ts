import { UserAgentParser } from "../../application/UserAgentParser";

export class UADevice {
  readonly vendor: string;
  readonly model: string;
  readonly type: string;

  constructor(value: string) {
    const userAgent = new UserAgentParser(value);
    const device = userAgent.getDevice();
    this.vendor = `${device.vendor}`;
    this.model = `${device.model}`;
    this.type = `${device.type}`;
  }

  toString(): string {
    return `${this.vendor};${this.model};${this.type}`;
  }
}
