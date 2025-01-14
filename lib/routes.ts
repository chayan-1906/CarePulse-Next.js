const routes = {
    homePath: () => '/',
    adminPath: () => '?admin=true',

    registerPath: (userId: string) => `/patients/${userId}/register`,
    newAppointmentPath: (userId: string) => `/patients/${userId}/new-appointment`,
    appointmentSuccessPath: (userId: string, appointmentId: string) => `/patients/${userId}/new-appointment/success?appointmentId=${appointmentId}`,
}

export default routes;
