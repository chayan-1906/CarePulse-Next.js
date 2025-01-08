async function RegistrationPage({params}: { params: Promise<{ userId: string }> }) {
    const {userId} = await params;

    return (
        <h1 className={'text-emerald-500 text-center font-black'}>{userId}</h1>
    );
}

export default RegistrationPage;
