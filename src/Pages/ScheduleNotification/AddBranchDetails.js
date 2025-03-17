import React from 'react'
import { useState, useEffect } from 'react'
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../reusable/LoadingComponent";
import errorHandler from "../../reusable/ErrorHandler";
import decrypt from "../../views/Encryption/decrypt";
import encrypt from "../../views/Encryption/encrypt";
import urlData from "../../UrlData";
import axios from "axios";
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import { MultiSelect } from 'react-multi-select-component';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import '../Stylee.css'


const AddBranchDetails = () => {
  const navigate = useNavigate();

  const [branch, setbranch] = useState([])
  //const [selectAllBranchIdToArray, setselectAllBranchIdToArray] = useState()
  const [isfilterSelectAll, setisfilterSelectAll] = useState()
  const [searchValue, setSearchValue] = useState("")
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalPages, settotalPages] = useState(4)
  const [stateList, setstateList] = useState([])
  const [getStateListData, setgetStateListData] = useState([{ value: "Tamil Nadu", label: "Tamil Nadu" }, { value: "Karnataka", label: "Karnataka" }, { value: "Madhya Pradesh", label: "Madhya Pradesh" }, { value: "Maharashtra", label: "Maharashtra" }, { value: "Bihar", label: "Bihar" }, { value: "Uttar Pradesh", label: "Uttar Pradesh" }])
  const [getBranchDetails, setgetBranchDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem("mN")).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem("data"))))
  const [errorCode, seterrorCode] = useState("")
  const [serrorCode, setserrorCode] = useState("")
  const [pageLimit, setPageLimit] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalDocument, settotalDocument] = useState('')
  const [branchIdArray, setbranchIdArray] = useState([])
  const [aerrorCode, setaerrorCode] = useState("")
  const [paginationDecider, setpaginationDecider] = useState('')
  const [fType, setfType] = useState("")
  const [fileName, setfileName] = useState("")
  const [excelFile, setExcelFile] = useState("")
  const handleFile = (e) => {
    // const fileType = ['text/csv']
    let selectedFile = e.target.files[0]
    setExcelFile(selectedFile)
  }
  if (loading) {
    return <LoadingComponent />;

  } else {
  return (
    <div className='fontfamily'>
      <Card>
        <CardHeader style={{ cursor: "pointer" }}>
          <b>Notification Branch/Users Details</b>
        </CardHeader>
        <CardBody>
          <Row className="mt-3">
            <Col xs="12" md="2">
              <Form.Label htmlFor="notificationType">
                File Type
                <span className="text-danger"> &#8727;</span>
              </Form.Label>
            </Col>
            <Col xs="12" md="6">
              <Form.Check
                type="radio"
                inline
                id="Branch Details"
                label="Branch Details"
                value="Branch Details"
                checked={fType === "Branch Details"}
                onChange={(e) => setfType(e.target.value)}
              />
              <Form.Check
                type="radio"
                inline
                id="User Details"
                label="User Details"
                value="User Details"
                checked={fType === "User Details"}
                onChange={(e) => setfType(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="2">
              <Form.Label htmlFor="fileUpload">
                File Upload
                <span className="text-danger"> &#8727;</span>
              </Form.Label>
            </Col>
            <Col xs="12" md="6">
              <Form.Control
                type="file"
                id="file-input"
                name="file-input"
                onChange={handleFile}
                accept=".xlsx, .xls"
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col xs="12" md="2">
              <Form.Label htmlFor="fileName">
                File Name
                <span className="text-danger"> &#8727;</span>
              </Form.Label>
            </Col>
            <Col xs="12" md="6">
              <Form.Control
                id="fileName"
                name="fileName"
                // onChange={(e) => setFileName(e.target.value)}
                onChange={(e) => setfileName(e.target.value)}
                placeholder="FileName"
              />
            </Col>
          </Row>
          <hr />

          {errorCode && (
            <Alert variant="danger" className="m-1">
              {errorCode}
            </Alert>
          )}
          <Button
            variant="success"
            size="md"
            // onClick={handleSave}
            onClick={'Save'}
            
          >
            Save{" "}
          </Button>
          <Button
            variant="primary"
            className="m-1"
            size="md"
            onClick={() => navigate("/ScheduleNotification/AddLanguageDetails/" + "k")}
          >
            Next{" "}
          </Button>
        </CardBody>
      </Card>
    </div>

  )
  }
}

export default AddBranchDetails