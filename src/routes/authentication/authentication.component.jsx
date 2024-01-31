import SignUpForm from '../../components/sign-up-form/sign-up.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignUpForm />
            <SignInForm />
        </AuthenticationContainer>
    );
};
export default Authentication;
