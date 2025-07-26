export default function Navbar() {
  return (
    <nav>
      
      <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
  <div className="bg-dark p-4">
    <h5 className="text-body-emphasis h4">Welcome to Wiki</h5>
    <span className="text-body-secondary">Use the search bar to find articles.</span>
  </div>
</div>
<nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
      
    </nav>
  );
}
