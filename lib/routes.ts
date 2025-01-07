const routes = {
    homePath: () => '/',
    adminPath: () => '?admin=true',

    registerPath: (userId: string) => `/patients/${userId}/register`,
}

export default routes;
