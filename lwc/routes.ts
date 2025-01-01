/**
 * An array of routes that are accessible to the public
 * These routes do not requre authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/aboutus",
    "/services",
    "/contactus",
    "/auth/new-verification",
    "/api/uploadthing", 
    "/api/webhook",
    "/explore-courses",
    "/api/actions/get-categories",
    "/api/actions/get-courses",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";


export const courseViewPrefix = "/courses";
export const chapterViewPrefix = "/chapters"
/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";