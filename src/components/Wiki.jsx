export default function Wiki() {
  return (
    <div>
      <div className="text-light d-flex align-items-center justify-content-center">
        <h1 className="">Wikipedia Dashboard</h1>
      </div>
      <div className="d-flex">
        <input
          type="text"
          name="search"
          className="form-control"
          placeholder="Enter a Wikipedia Page Title (eg: gay)"
        />
        <button className="btn btn-primary">Search</button>
      </div>
    </div>
  );
}
