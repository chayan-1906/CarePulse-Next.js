const routes = {
    homePath: () => '/',
    adminPath: () => '?admin=true',

    registerPath: (userId: string) => `/patients/${userId}/register`,
    newAppointmentPath: (userId: string) => `/patients/${userId}/new-appointment`,
    // newAppointmentPath: (userId: string) => `/patients/677e716a0032906a319f/new-appointment`,
}

export default routes;
