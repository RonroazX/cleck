import { AggregateRoot } from '../../../../Shared/domain/AggregateRoot';
import { DeviceId } from '../../../Shared/domain/Device/DeviceId';
import { UserAgent, UserAgentPrimitives } from '../UserAgent/UserAgent';

export interface DeviceParams {
  id: DeviceId;
  userAgent: UserAgent;
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

  toPrimitives(): {
    id: string;
    userAgent: UserAgentPrimitives;
    dateAdd: Date;
    dateUpd: Date;
  } {
    return {
      id: this.id.value,
      userAgent: this.userAgent.toPrimitives(),
      dateAdd: this.dateAdd,
      dateUpd: this.dateUpd
    };
  }
}
