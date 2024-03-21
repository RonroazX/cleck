import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Device } from './Devices/Device';
import { UserIP } from '../../Shared/domain/Users/UserIP';
import { SessionId } from '../../Shared/domain/Sessions/SessionId';

export interface SessionParams {
  id: SessionId;
  userIp: UserIP;
  rawUserAgent: string;
  device: Device;
  dateAdd: Date;
  dateUpd: Date;
  dateExp: Date;
  dateRevoke: Date;
}

export class Session extends AggregateRoot {
  id: SessionId;
  userIP: UserIP;
  rawUserAgent: string;
  device: Device;
  dateAdd: Date;
  dateUpd: Date;
  dateExp: Date;
  dateRevoke: Date;

  constructor({ id, userIp, dateAdd, dateExp, dateRevoke, dateUpd, device, rawUserAgent }: SessionParams) {
    super();
    this.id = id;
    this.userIP = userIp;
    this.rawUserAgent = rawUserAgent;
    this.device = device;
    this.dateAdd = dateAdd;
    this.dateUpd = dateUpd;
    this.dateRevoke = dateRevoke;
    this.dateExp = dateExp;
  }

  toPrimitives(): {
    id: string;
    userIP: string;
    rawUserAgent: string;
    device: Device;
    dateAdd: Date;
    dateUpd: Date;
    dateExp: Date;
    dateRevoke: Date;
  } {
    throw new Error('Method not implemented.');
  }
}
