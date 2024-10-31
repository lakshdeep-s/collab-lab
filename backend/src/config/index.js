const config = {
  development: {
    db: "mongodb://localhost:27017/collab_lab",
    accessTokenSecret: 'my_access_token_secret',
    refreshTokenSecret: 'my_refresh_token_secret',

    accessTokenCookieOptions: {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 20 * 60 * 1000
    },

    refreshTokenCookieOptions: {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000,
      path: "/auth/refresh"  
    },
    CLIENT_URL: 'http://localhost:5173'
  },
  production: {
    db: process.env.MONGO_URI,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    
    accessTokenCookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 20 * 60 * 1000
    },

    refreshTokenCookieOptions: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 2 * 60 * 60 * 1000,
      path: "/auth/refresh"  
    },
    CLIENT_URL: process.env.CLIENT_URL
  },
};

export default config[process.env.NODE_ENV || "development"];
