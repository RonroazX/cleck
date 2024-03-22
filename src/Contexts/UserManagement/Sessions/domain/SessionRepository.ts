import { UserId } from "../../Shared/domain/Users/UserId";
import { Nullable } from "../../../Shared/domain/Nullable";
import { Session } from "./Session";

export interface SessionRepository {
	save(session: Session): Promise<void>;

  getUserSessions(userId: UserId): Promise<Nullable<Session>[]>;
}
