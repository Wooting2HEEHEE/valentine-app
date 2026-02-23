import { redirect } from 'next/navigation';

export default function ClearSession() {
  // Rensa session genom att redirecta till login med logout
  redirect('/login?logout=true');
}
