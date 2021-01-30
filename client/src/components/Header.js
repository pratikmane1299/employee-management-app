function Header({ onAddEmployee }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Employee Management
        </a>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <div className="ml-auto">
            <button className="btn btn-primary" onClick={onAddEmployee}>Add Employee</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
