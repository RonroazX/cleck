import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserAgent } from './UserAgent/UserAgent';

export class Session extends AggregateRoot {
  constructor({ userAgent }: { userAgent: UserAgent }) {
    super();
    this.userAgent = userAgent;
  }

  userAgent: UserAgent;

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
