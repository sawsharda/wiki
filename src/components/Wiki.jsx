import Noimage from "../assets/No-Image-Placeholder.svg.png";
import {Card,
  Container,
Row,
Col,
Form} from "react-bootstrap";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
];
export default function Wiki() {
  return (
    <Container >
      <div className="text-light d-flex align-items-center justify-content-center min-w-0 sm:w-300 md:min-w-400 lg:min-w-500 max-w-80vw">
        <h1 className="">Wikipedia Dashboard</h1>
      </div>
      <Form>
        <div className=" d-flex  gap-2 align-items-center justify-content-center">
            <input
              type="text"
              name="search"
              className="form-control "
              placeholder="Enter a Wikipedia Page Title (eg: Hello)"
            />
         
             <button className="btn btn-primary ml-2">Search</button>
          </div>
      </Form>
      

       <Card className="p-4">
        
      
        <Card className="p-2 mb-4">
          <h1 class="text-center color-white">Title Page#pageid</h1>
        </Card>
         <Row className="mb-4">
          <Col xs={12} md={6} lg={4}
 className="p-3">
            <img src={Noimage} alt="No Image" style={{width:"20vw"}}/>
          </Col>
          <Col xs={12} md={6} lg={4}
 className="p-3">
<Card className="p-4" >         
     <p  >No summary provided on the page.Please visit the page for more details.</p>
         </Card>

          </Col>
       </Row>
       <Row className="mb-4">
        <Col xs={12} md={6} lg={4}
className="p-3">
        <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Open Original Page</li>
  <li class="list-group-item">Created on:</li>
  <li class="list-group-item">Page size:</li>
  <li class="list-group-item">Last Edited</li>
  <li class="list-group-item">View in last 30 day:</li>
</ul>
        </Col>
        <Col xs={12} md={6} lg={4}
 className="p-3">
     <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Open Original Page</li>
  <li class="list-group-item">Created on:</li>
  <li class="list-group-item">Page size:</li>
  <li class="list-group-item">Last Edited</li>
  <li class="list-group-item">View in last 30 day:</li>
</ul>
        </Col>
        <Col xs={12} md={6} lg={4}
className="p-3">
        <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Open Original Page</li>
  <li class="list-group-item">Created on:</li>
  <li class="list-group-item">Page size:</li>
  <li class="list-group-item">Last Edited</li>
  <li class="list-group-item">View in last 30 day:</li>
</ul>
        </Col>
       </Row>
       <Card>
        <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
       </Card>


  
      </Card>
    </Container>
  );
}
