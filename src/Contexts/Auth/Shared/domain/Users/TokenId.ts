import { Uuid } from '../../../../Shared/domain/value-object/Uuid';

export class ClientId extends Uuid {
  isEqual(refreshToken: string): boolean {
    return this.value == refreshToken;
  }
}
