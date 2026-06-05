import { Card } from "@/components/card";
import { SettingsForm } from "@/components/workspace/settings-form";
import { readDb } from "@/lib/server/db";
import { demoUserId, getSessionUserId } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const db = await readDb();
  const userId = await getSessionUserId();
  const user = db.users.find((item) => item.id === userId) || db.users.find((item) => item.id === demoUserId);

  if (!user) return null;
  const { passwordHash: _passwordHash, ...safeUser } = user;

  return (
    <div>
      <h1 className="text-4xl font-black">Account Settings</h1>
      <Card className="mt-8 max-w-2xl">
        <SettingsForm user={safeUser} />
      </Card>
    </div>
  );
}
