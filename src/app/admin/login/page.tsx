import Link from "next/link";

type AdminLoginProps = {
  searchParams?: { error?: string };
};

export default function AdminLogin({ searchParams }: AdminLoginProps) {
  const hasError = Boolean(searchParams?.error);

  return (
    <section className="admin-shell">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Admin Access</p>
          <h2>Sign in to Admin</h2>
          <p className="admin-sub">Enter the admin access token.</p>
        </div>
        <div className="admin-actions">
          <Link className="button" href="/">
            Back to Site
          </Link>
        </div>
      </div>

      <div className="admin-card admin-form">
        <form action="/api/admin/login" method="post">
          <label htmlFor="token">Admin Token</label>
          <input
            id="token"
            name="token"
            type="password"
            placeholder="Enter admin token"
            required
          />
          {hasError && (
            <p className="admin-error">Invalid token. Please try again.</p>
          )}
          <button className="button primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
