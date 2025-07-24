export default function Wiki(){
    return(
        <div>
            <div className="bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
            <h1 className="justify-content-between d-flex">
                Wikipedia Dashboard
            </h1>
            <div >
                <input
                 type="text" 
                 name="search" 
                 className="form-control"
                 placeholder="Enter a Wikipedia Page Title (eg: gay)" />
                <button className="btn btn-primary">Search</button>
            </div>
            </div>
        </div>
    )
}