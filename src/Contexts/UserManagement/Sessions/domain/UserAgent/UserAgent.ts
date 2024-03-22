import { AggregateRoot } from "../../../../Shared/domain/AggregateRoot";
import { UABrowser } from "./UABrowser";
import { UADevice } from "./UADevice";
import { UAEngine } from "./UAEngine";
import { UAOs } from "./UAOs";

export interface UserAgentParams {
  browser: UABrowser;
  engine: UAEngine;
  os: UAOs;
  device: UADevice;
  cpu: string;
}

export interface UserAgentPrimitives {
    browser: string;
    engine: string;
    device: string;
    cpu: string;
    os: string;
}

export class UserAgent extends AggregateRoot {
  constructor({
    browser,
    engine,
    os,
    device,
    cpu
  }: UserAgentParams) {
    super();
    this.browser = browser;
    this.engine = engine;
    this.os = os;
    this.device = device;
    this.cpu = cpu;
  }

  browser: UABrowser;
  engine: UAEngine;
  os: UAOs;
  device: UADevice;
  cpu: string;

  toPrimitives(): UserAgentPrimitives {
    return {
      browser: this.browser.toString(),
      device: this.device.toString(),
      os: this.os.toString(),
      engine: this.engine.value,
      cpu: this.cpu,
    }
  }

  static fromPrimitives(plainData: {
    browser: string;
    engine: string;
    device: string;
    cpu: string;
    os: string;
  }): UserAgent {
    return new UserAgent({
      browser: new UABrowser(plainData.browser),
      cpu: plainData.cpu,
      device: new UADevice(plainData.device),
      engine: new UAEngine(plainData.engine),
      os: new UAOs(plainData.os),
    });
  }
}
