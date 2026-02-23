import { SetupWizard } from '@/components/onboarding/setup-wizard';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { redirect } from 'next/navigation';

export default async function SetupPage() {
  let user;

  try {
    user = await getAuthenticatedUser();
  } catch (error) {
    redirect('/login');
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-sm border">
      <SetupWizard />
    </div>
  );
}
