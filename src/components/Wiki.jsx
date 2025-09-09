import { useState } from "react";
import Noimage from "../assets/No-Image-Placeholder.svg.png";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

// const data = [
//   { month: 'Jan', visitors: 1500 },
//   { month: 'Feb', visitors: 1200 },
//   { month: 'Mar', visitors: 1800 },
//   { month: 'Apr', visitors: 900 },
// ];

export default function Wiki() {
    const [searchTerm, setSearchTerm] = useState("");
    const [wikiData, setWikiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [graphData, setGraphData] = useState([]);
const handleSearch = async () => {
  if (!searchTerm) return;

  setLoading(true);
  setError("");
  setWikiData(null);
  setGraphData([]);

  try {
    const encodedTerm = encodeURIComponent(searchTerm.trim());

    const summaryResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTerm}`);
    if (!summaryResponse.ok) throw new Error("Page not found");
    const summaryData = await summaryResponse.json();

    const infoResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodedTerm}&prop=info&inprop=protection&format=json&origin=*`);
    const infoData = await infoResponse.json();
    const infoPages = infoData.query.pages;
    const infoPageId = Object.keys(infoPages)[0];
    const pageInfo = infoPages[infoPageId];

    const creationResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${encodedTerm}&rvlimit=1&rvprop=timestamp&rvdir=newer&format=json&origin=*`);
    const creationData = await creationResponse.json();
    const creationPages = creationData.query.pages;
    const creationPageId = Object.keys(creationPages)[0];
    const creationDate = creationPages[creationPageId].revisions?.[0]?.timestamp;

    const revisionResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${encodedTerm}&rvlimit=1&rvprop=timestamp|user|ids&format=json&origin=*`);
    const revisionData = await revisionResponse.json();
    const revisionPages = revisionData.query.pages;
    const revisionPageId = Object.keys(revisionPages)[0];
    const revision = revisionPages[revisionPageId].revisions?.[0];

    const backlinksResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bltitle=${encodedTerm}&bllimit=10&format=json&origin=*`);
    const backlinksData = await backlinksResponse.json();
    const backlinks = backlinksData.query.backlinks.map(b => b.title);

    const linksResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodedTerm}&prop=links&pllimit=10&format=json&origin=*`);
const linksData = await linksResponse.json();
const linksPages = linksData.query.pages;
const links = Object.values(linksPages)[0].links?.map(link => link.title) || [];

const today = new Date();
    const endDate = today.toISOString().split('T')[0].replace(/-/g, '');
    const startDate = new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0].replace(/-/g, '');

const pageviewsResponse = await fetch(
  `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${encodedTerm}/daily/${startDate}/${endDate}`
);

let dailyViews = [];
if (pageviewsResponse.ok) {
  const pageviewsData = await pageviewsResponse.json();
dailyViews = pageviewsData.items.map(item => {
  const dateStr = item.timestamp.slice(0, 8); 
  const formattedDate = `${dateStr.slice(6,8)} ${new Date(dateStr.slice(0,4), parseInt(dateStr.slice(4,6))-1, dateStr.slice(6,8)).toLocaleString('default', { month: 'short' })}`;
  return {
    date: formattedDate,
    views: item.views
  };
});
} else {
  console.warn("Pageviews data not found for this term");
}

setGraphData(dailyViews);

const totalViews = dailyViews.reduce((sum, item) => sum + item.views, 0);
const avgViews = dailyViews.length ? (totalViews / dailyViews.length).toFixed(2) : 0;


    setWikiData({
      ...summaryData,
      length: pageInfo.length,
      protection: pageInfo.protection || [],
      creationDate,
      lastEdited: revision?.timestamp,
      lastEditor: revision?.user,
      lastRevisionId: revision?.revid,
      backlinks,
      links,

      totalViews,
      avgViews,
    });

  } catch (err) {
    console.error(err);
    setError("Failed to fetch Wikipedia page");
  } finally {
    setLoading(false);
  }
};
  return (
    <Container className="my-5 ">
      
      <div className="text-center mb-5">
        <h2 className="display-4 text-primary">Wiki Insight Dashboard</h2>
        <p className="text-muted">Search Wikipedia pages and track their metrics over time.</p>
      </div>

      <Form className="d-flex justify-content-center mb-4">
        <input
          type="text"
          name="search"
          className="form-control me-2"
          placeholder="Search Wikipedia Page (e.g., Quantum Mechanics)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px' }}
        />
        <Button variant="success" onClick={handleSearch}>Search</Button>
      </Form>

{loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {wikiData && (
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col md={4} className="text-center">
              <img 
              src={wikiData.thumbnail?.source || Noimage}
              alt={wikiData.title} style={{ maxWidth: '100%', borderRadius: '8px' }} />
            </Col>
            <Col md={8}>
              <h3 className="mb-3">{wikiData.title} (Page ID: {wikiData.pageid})</h3>
              <p className="text-secondary">
              {wikiData.extract || "No summary available. Please visit the original Wikipedia page for full details."}
              </p>
              <Button variant="primary" href={wikiData.content_urls.desktop.page ||"https://en.wikipedia.org"} target="_blank">Visit Wikipedia Page</Button>
            </Col>
          </Row>
          
          <Row className="mb-4">
        <Col xs={12} md={6} lg={4}
className="p-3">
        <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Open Original Page</li>
  <li class="list-group-item">Created on:{wikiData.creationDate }</li>
  <li class="list-group-item">Page size:{wikiData.length} bytes</li>
  <li class="list-group-item">Last Edited: {wikiData.lastEdited}</li>
  <li class="list-group-item">Page Protection: {wikiData.protection.length > 0 ? "Protected" : "None"}</li>
</ul>
        </Col> 
        
      </Row>
      <Row className="mb-4">
        
  <Col xs={12} md={6}>
    <h5>Linked Pages</h5>
    <div style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '15px', borderRadius:'8px'}}>
      <ul className="list-group">
        {wikiData.links.map((title, index) => (
          <li key={index} className="list-group-item">{title}</li>
        ))}
      </ul>
    </div>
  </Col>

  <Col xs={12} md={6}>
    <h5>Backlinked Pages</h5>
    <div style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '15px', borderRadius:'8px' }}>
      <ul className="list-group">
        {wikiData.backlinks.map((title, index) => (
          <li key={index} className="list-group-item">{title}</li>
        ))}
      </ul>
    </div>
  </Col>
</Row>

<div className="mt-5">
  <h5 className="mb-3 text-center">Daily Page Views (Last 30 days)</h5>
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <LineChart data={graphData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#2ca02c" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
  <p className="text-center">
    <strong>Total Views:</strong> {wikiData.totalViews} &nbsp;|&nbsp;
    <strong>Avg Daily Views:</strong> {wikiData.avgViews}
  </p>
</div>
        </Card.Body>
      </Card>
    )}
    </Container>

  );
}