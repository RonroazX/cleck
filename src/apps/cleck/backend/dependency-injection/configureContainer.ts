import * as awilix from 'awilix';

import { MongoEnvironmentArranger } from '../../../../../tests/Contexts/Shared/infrastructure/mongo/MongoEnvironmentArranger';
import { MongoConfigFactory } from '../../../../Contexts/Auth/Shared/infrastructure/persistance/mongo/MongoConfigFactory';
import { UserCreator } from '../../../../Contexts/Auth/Users/application/UserCreator';
import { MongoUserRepository } from '../../../../Contexts/Auth/Users/infrastructure/MongoUserRepository';
import { MongoClientFactory } from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoClientFactory';
import MongoConfig from '../../../../Contexts/Shared/infrastructure/persistance/mongo/MongoConfig';
import { LoginPostController } from '../controllers/LoginPostController';
import { SignupPostController } from '../controllers/SignupPostController';
import StatusGetController from '../controllers/StatusGetController';

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
	environmentArranger: awilix.asClass(MongoEnvironmentArranger).singleton()
});

export default container;