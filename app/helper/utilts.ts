
export const LoginFlow = (email: string, password: string) => {
    console.log('LoginFlow');
    if (email === 'Admin@mail.com' && password === 'Admin') {
        return 'MbgBA8gBAPgBAcICChAAGEcY1gQYsAPCAgoQABiKBRiwAxhD4g';
    }
    return null;
}
