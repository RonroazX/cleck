import { SessionRepository } from '../../domain/SessionRepository';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { UserId } from '../../../Shared/domain/Users/UserId';
import { MongoRepository } from '../../../../Shared/infrastructure/persistance/mongo/MongoRepository';
import { Session, SessionPrimitives } from '../../domain/Session';

interface SessionDocument extends SessionPrimitives{}

export class MongoSessionRepository extends MongoRepository<Session> implements SessionRepository {
  async getUserSessions(userId: UserId): Promise<Nullable<Session>[]> {
    const collection = await this.collection();

    const sessionDocuments = await collection.find<SessionDocument>({
      userId: userId.value
    }).toArray();

    return sessionDocuments.map((sessionDocument: SessionDocument) => Session.fromPrimitives({
      id: sessionDocument.id,
      userId: sessionDocument.userId,
      userIP: sessionDocument.userIP,
      rawUserAgent: sessionDocument.rawUserAgent,
      device: sessionDocument.device,
      dateAdd: sessionDocument.dateAdd,
      dateExp: sessionDocument.dateExp,
      dateRevoke: sessionDocument.dateRevoke,
      dateUpd: sessionDocument.dateUpd
    }))
  }

	async save(session: Session): Promise<void> {
		await this.persist(session.id.value, session);
	}

	protected collectionName(): string {
		return 'sessions';
	}
}
