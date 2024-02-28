import * as awilix from 'awilix';

import { MongoEnvironmentArranger } from '../../../../../tests/Contexts/Shared/infrastructure/mongo/MongoEnvironmentArranger';
import { MongoConfigFactory } from '../../../../Contexts/Auth/Shared/infrastructure/persistance/mongo/MongoConfigFactory';
import { HashUserPasswordService } from '../../../../Contexts/Auth/Users/application/HashUserPassword';
import { TokenCreator } from '../../../../Contexts/Auth/Tokens/application/TokenCreator';
import { PasswordValidator } from '../../../../Contexts/Auth/Users/application/PasswordValidator';
import { UserCreator } from '../../../../Contexts/Auth/Users/application/UserCreator';
import { UserEmailExistanceChecker } from '../../../../Contexts/Auth/Users/application/UserEmailExistanceChecker';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { MongoUserRepository } from '../../../../Contexts/Auth/Users/infrastructure/MongoUserRepository';
import { MongoClientFactory } from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory';
import MongoConfig from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoConfig';
import { LoginPostController } from '../controllers/LoginPostController';
import { LogoutPostController } from '../controllers/LogoutPostController';
import { RefreshPostController } from '../controllers/refreshPostController';
import { SignupPostController } from '../controllers/SignupPostController';
import StatusGetController from '../controllers/StatusGetController';
import { RefreshTokenService } from '../../../../Contexts/Auth/Tokens/application/RefreshTokenService';
import { MongoTokenRepository } from '../../../../Contexts/Auth/Tokens/infrastructure/MongoTokenRepository';

const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY,
	strict: true
});

container.register({
	mongoConfig: awilix.asFunction(() => MongoConfigFactory.createConfig()).singleton(),
	connectionManager: awilix
		.asFunction(({ mongoConfig }: { mongoConfig: MongoConfig }) =>
			MongoClientFactory.createClient('accessmanagement', mongoConfig)
		)
		.singleton(),
	userRepository: awilix.asClass(MongoUserRepository).singleton(),
	userCreator: awilix.asClass(UserCreator).singleton(),
	loginPostController: awilix.asClass(LoginPostController).singleton(),
	signupPostController: awilix.asClass(SignupPostController).singleton(),
	logoutPostController: awilix.asClass(LogoutPostController).singleton(),
	statusGetController: awilix.asClass(StatusGetController).singleton(),
	refreshPostController: awilix.asClass(RefreshPostController).singleton(),
	environmentArranger: awilix.asClass(MongoEnvironmentArranger).singleton(),
	hashService: awilix.asClass(HashUserPasswordService).singleton(),
  refreshTokenService: awilix.asClass(RefreshTokenService).singleton(),
	userValidator: awilix.asClass(UserValidator).singleton(),
	passwordValidator: awilix.asClass(PasswordValidator).singleton(),
	tokenCreator: awilix.asClass(TokenCreator).singleton(),
  tokenRepository: awilix.asClass(MongoTokenRepository).singleton(),
	userEmailExistanceChecker: awilix.asClass(UserEmailExistanceChecker).singleton()
});

export default container;
