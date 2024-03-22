import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Device, DevicePrimitives } from './Devices/Device';
import { UserIP } from '../../Shared/domain/Users/UserIP';
import { SessionId } from '../../Shared/domain/Sessions/SessionId';
import { UserId } from '../../Shared/domain/Users/UserId';

export interface SessionParams {
  id: SessionId;
  userId: UserId;
  userIp: UserIP;
  rawUserAgent: string;
  device: Device;
  dateAdd: Date;
  dateUpd: Date;
  dateExp: Date;
  dateRevoke: Date;
}

export interface SessionPrimitives {
  id: string;
  userId: string;
  userIP: string;
  rawUserAgent: string;
  device: DevicePrimitives;
  dateAdd: Date;
  dateUpd: Date;
  dateExp: Date;
  dateRevoke: Date;
}

export class Session extends AggregateRoot {
  id: SessionId;
  userId: UserId;
  userIP: UserIP;
  rawUserAgent: string;
  device: Device;
  dateAdd: Date;
  dateUpd: Date;
  dateExp: Date;
  dateRevoke: Date;

  constructor({ id,userId, userIp, dateAdd, dateExp, dateRevoke, dateUpd, device, rawUserAgent }: SessionParams) {
    super();
    this.id = id;
    this.userId = userId;
    this.userIP = userIp;
    this.rawUserAgent = rawUserAgent;
    this.device = device;
    this.dateAdd = dateAdd;
    this.dateUpd = dateUpd;
    this.dateRevoke = dateRevoke;
    this.dateExp = dateExp;
  }

  toPrimitives(): SessionPrimitives {
    return {
      id: this.id.value,
      userId: this.userId.value,
      userIP: this.userIP.value,
      rawUserAgent: this.rawUserAgent,
      device: this.device.toPrimitives(),
      dateAdd: this.dateAdd,
      dateExp: this.dateExp,
      dateUpd: this.dateUpd,
      dateRevoke: this.dateRevoke
    };
  }

  static fromPrimitives(plainData: {
    id: string;
    userId: string;
    userIP: string;
    rawUserAgent: string;
    device: DevicePrimitives;
    dateAdd: Date;
    dateUpd: Date;
    dateRevoke: Date;
    dateExp: Date;
  }): Session {
    return new Session({
      id: new SessionId(plainData.id),
      userId: new UserId(plainData.userId),
      userIp: new UserIP(plainData.userIP),
      rawUserAgent: plainData.rawUserAgent,
      device: Device.fromPrimitives({
        id: plainData.device.id,
        dateAdd: plainData.device.dateAdd,
        dateUpd: plainData.device.dateUpd,
        userAgent: plainData.device.userAgent
      }),
      dateAdd: plainData.dateAdd,
      dateUpd: plainData.dateUpd,
      dateRevoke: plainData.dateRevoke,
      dateExp: plainData.dateExp
    });
  }
}
