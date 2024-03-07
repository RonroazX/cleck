const USER = {
	minPasswordLength: 8,
	minUsernameLength: 5,
	maxUsernameLength: 35
};

const AUTH = {
  accessTokenExp: process.env.ACCESSS_TOKEN_EXPIRATION || '5m',
  refreshTokenExp: process.env.REFRESH_TOKEN_EXPIRATION || '1d',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secure_key',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'secure_key'
}


export {
  USER,
  AUTH
};
