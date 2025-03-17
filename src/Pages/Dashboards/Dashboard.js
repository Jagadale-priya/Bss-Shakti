import React from 'react'
import { Col, Row } from 'react-bootstrap'
// import StateWiseDownloads from '../StateWiseDownloads/StateWiseDownloads'
import UserAnalytics from './UserAnalytics/UserAnalytics'
import MostBrowsedPageData from './MostBrowsedPageData/MostBrowsedPageData'

function Dashboard() {
  return (
    <div>
    <Row>
      <Col xs={12} sm={12} lg={12}>        
        <MostBrowsedPageData/> 
      </Col>
    </Row>
    <Row className="mt-4">
      <Col xs={12} sm={12}  lg={8}>
        <UserAnalytics/> 
      </Col>
      {/* You can add more columns here as needed */}
    </Row>
  </div>
  )
}

export default Dashboard
