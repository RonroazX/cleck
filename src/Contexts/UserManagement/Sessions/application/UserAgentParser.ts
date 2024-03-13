import parser from 'ua-parser-js';

export class UserAgentParser {
  readonly ua;
  constructor(value: string) {
    this.ua = parser(value);
  }

  getBrowser(): { name?: string; version?: string } {
    return { name: this.ua.browser.name, version: this.ua.browser.version };
  }

  getOS(): { name?: string; version?: string } {
    return { name: this.ua.os.name, version: this.ua.os.version };
  }

  getDevice(): { vendor?: string; model?: string; type?: string } {
    return { vendor: this.ua.device.vendor, model: this.ua.device.model, type: this.ua.device.type };
  }

  getEngine(): string | undefined {
    return this.ua.engine.name;
  }

  getCPU(): string | undefined {
    return this.ua.cpu.architecture;
  }
}
