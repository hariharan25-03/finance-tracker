
type Props = {
  user?: { name: string };
  onSignOut: () => void;
  onNavigate: (route: string) => void;
};

export default function Header({ user, onSignOut, onNavigate }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center text-xl font-bold text-indigo-600">PF</div>
        <div>
          <h1 className="text-2xl font-semibold">Finance Portfolio</h1>
          <p className="text-sm text-slate-500">Smart view of your investments</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-slate-700">{user.name}</div>
            <button onClick={onSignOut} className="px-3 py-2 bg-white shadow rounded-md">Sign out</button>
          </>
        ) : (
          <button onClick={() => onNavigate("signup")} className="px-4 py-2 rounded-md bg-indigo-600 text-white shadow">Get started</button>
        )}
      </div>
    </div>
  );
}
