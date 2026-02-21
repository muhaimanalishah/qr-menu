import { useMutation } from '@tanstack/react-query';
import { emailSignInAction, emailSignUpAction } from '../actions/auth.actions';
import { signInInput, signUpInput } from '../schema/auth.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useEmailSignUp() {
    const router = useRouter();
  return useMutation({
    mutationFn: (payload: signUpInput) => emailSignUpAction(payload),
    onSuccess: () => {
        toast.success('Signed up successfully!')
        router.push('/login');
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useEmailSignIn() {
    const router = useRouter();
  return useMutation({
    mutationFn: (payload: signInInput) => emailSignInAction(payload),
    onSuccess: () => {
        toast.success('Signed in successfully!')
        router.push('/admin');
    },
    onError: (error) => toast.error(error.message),
  });
}
