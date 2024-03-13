import { AggregateRoot } from "../../../../Shared/domain/AggregateRoot";
import { UABrowser } from "./UABrowser";

export interface UserAgentParams {
  browser: UABrowser;
  engine: UAEngine;
  os: UAOs;
  device: UADevice;
  cpu: string;
}

export class UserAgent extends AggregateRoot {
  constructor({
    browser,
    engine,
    os,
    device,
    cpu
  }: {
    browser: UABrowser;
    engine: UAEngine;
    os: UAOs;
    device: UADevice;
    cpu: string;
  }) {
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

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
