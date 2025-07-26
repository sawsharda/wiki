import Noimage from "../assets/No-Image-Placeholder.svg.png";

export default function Wiki() {
  return (
    <div>
      <div className="text-light d-flex align-items-center justify-content-center min-w-0 sm:w-300 md:min-w-400 lg:min-w-500 max-w-80vw">
        <h1 className="">Wikipedia Dashboard</h1>
      </div>
      <div className="d-flex">
        <input
          type="text"
          name="search"
          className="form-control"
          placeholder="Enter a Wikipedia Page Title (eg: Hello)"
        />
        <button className="btn btn-primary">Search</button>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4 border-2 border-secondary rounded p-4">
        <div>
          <h1>Title Page#pageid</h1>
        </div>
        <div>
          <div className="h-20 w-20 ">
          <img src={Noimage} alt="No Image" />
          </div>
          <div>
            <p>No summary provided on the page.Please visit the page for more details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
