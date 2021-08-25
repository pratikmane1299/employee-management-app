function Header({ onAddEmployee }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            Employee Management
          </a>
          <button className="btn btn-primary" onClick={onAddEmployee}>Add Employee</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
