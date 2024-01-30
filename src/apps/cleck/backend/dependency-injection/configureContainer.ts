import * as awilix from 'awilix';

import { MongoEnvironmentArranger } from '../../../../../tests/Contexts/Shared/infrastructure/mongo/MongoEnvironmentArranger';
import { MongoConfigFactory } from '../../../../Contexts/Auth/Shared/infrastructure/persistance/mongo/MongoConfigFactory';
import { HashUserPasswordService } from '../../../../Contexts/Auth/Users/application/HashUserPassword';
import { JWTService } from '../../../../Contexts/Auth/Users/application/JwtService';
import { PasswordValidator } from '../../../../Contexts/Auth/Users/application/PasswordValidator';
import { UserCreator } from '../../../../Contexts/Auth/Users/application/UserCreator';
import { UserValidator } from '../../../../Contexts/Auth/Users/application/UserValidator';
import { MongoUserRepository } from '../../../../Contexts/Auth/Users/infrastructure/MongoUserRepository';
import { MongoClientFactory } from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory';
import MongoConfig from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoConfig';
import { LoginPostController } from '../controllers/LoginPostController';
import { SignupPostController } from '../controllers/SignupPostController';
import StatusGetController from '../controllers/StatusGetController';
import { UserEmailExistanceChecker } from '../../../../Contexts/Auth/Users/application/UserEmailExistanceChecker';

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
	statusGetController: awilix.asClass(StatusGetController).singleton(),
	environmentArranger: awilix.asClass(MongoEnvironmentArranger).singleton(),
	hashService: awilix.asClass(HashUserPasswordService).singleton(),
	userValidator: awilix.asClass(UserValidator).singleton(),
	passwordValidator: awilix.asClass(PasswordValidator).singleton(),
	jwtService: awilix.asClass(JWTService).singleton(),
  userEmailExistanceChecker: awilix.asClass(UserEmailExistanceChecker).singleton(),
});

export default container;
