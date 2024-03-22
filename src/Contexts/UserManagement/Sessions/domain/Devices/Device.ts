import { userInfo } from 'os';
import { AggregateRoot } from '../../../../Shared/domain/AggregateRoot';
import { DeviceId } from '../../../Shared/domain/Device/DeviceId';
import { UserAgent, UserAgentPrimitives } from '../UserAgent/UserAgent';

export interface DeviceParams {
  id: DeviceId;
  userAgent: UserAgent;
  dateAdd: Date;
  dateUpd: Date;
}

export interface DevicePrimitives {
  id: string;
  userAgent: UserAgentPrimitives;
  dateAdd: Date;
  dateUpd: Date;
}

export class Device extends AggregateRoot {
  id: DeviceId;
  userAgent: UserAgent;
  dateAdd: Date;
  dateUpd: Date;

  constructor({ id, userAgent, dateAdd, dateUpd }: DeviceParams) {
    super();
    this.id = id;
    this.userAgent = userAgent;
    this.dateAdd = dateAdd;
    this.dateUpd = dateUpd;
  }

  toPrimitives(): DevicePrimitives {
    return {
      id: this.id.value,
      userAgent: this.userAgent.toPrimitives(),
      dateAdd: this.dateAdd,
      dateUpd: this.dateUpd
    };
  }

  static fromPrimitives(plainData: {
    id: string;
    userAgent: UserAgentPrimitives;
    dateAdd: Date;
    dateUpd: Date;
  }): Device {
    return new Device({
      id: new DeviceId(plainData.id),
      userAgent: UserAgent.fromPrimitives({
        browser: plainData.userAgent.browser,
        cpu: plainData.userAgent.cpu,
        device: plainData.userAgent.device,
        engine: plainData.userAgent.engine,
        os: plainData.userAgent.os
      }),
      dateAdd: plainData.dateAdd,
      dateUpd: plainData.dateAdd
    });
  }
}
