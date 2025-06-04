// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Note Taker</a>
      </nav>

      <div className="container">
        <div className="jumbotron text-center" style={{ marginTop: '80px' }}>
          <h1 className="display-4">
            Note Taker <span role="img" aria-label="Memo">📝</span>
          </h1>
          <h4 className="mt-4">Take notes with Express</h4>
          <Link href="/notes" passHref legacyBehavior>
            <a className="btn btn-primary btn-lg mt-4" role="button">Get Started</a>
          </Link>
        </div>
      </div>
    </>
  );
}
