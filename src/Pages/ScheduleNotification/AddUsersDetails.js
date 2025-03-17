import React, { useState } from 'react'
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Table,
  Alert,
} from 'react-bootstrap';
import '../Stylee.css'

const AddUsersDetails = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectAllBranchIdToArray, setselectAllBranchIdToArray] = useState()
  const [isfilterSelectAll, setisfilterSelectAll] = useState()
  const [curentPageNumber, setcurentPageNumber] = useState("")
  const [totalPages, settotalPages] = useState(4)
  const navigate = useNavigate();

  const getBranchDetails = [{ label: "101", value: "Yash", branch: "Mumbai", fo: "12", mN: "70212058" }, { label: "102", value: "Kaus", branch: "Pune", fo: "124", mN: "70212098" }, { label: "104", value: "Runali", branch: "Nasik", fo: "10", mN: "70712058" },
  { label: "106", value: "Shruti", branch: "Nagpur", fo: "17", mN: "70216058" }]
  // eslint-disable-next-line react/jsx-key
  const selectbranchposts = getBranchDetails.map(post => <tbody>
    <tr key={post.label}>
      <td className="text-center">
        <input
          //    id={post.corporateBranchId}
          //    name={post.branchName}
          type={"checkbox"}
        //    onChange={()=>addBranchIdToArray(post,post.corporateBranchId)}
        //    checked={branchIdArray.includes(post.corporateBranchId)}
        />
      </td>
      <td className="text-center">{post.label}</td>
      <td className="text-center">{post.value}</td>
      <td className="text-center">{post.branch}</td>
      <td className="text-center">{post.fo}</td>
      <td className="text-center">{post.mN}</td>



    </tr>

  </tbody>)
  return (
    <div className='fontfamily'>
      <Card>
        <CardHeader style={{ cursor: "pointer" }}>
          <b>Notification Users Details/testing</b>
        </CardHeader>
        <CardBody>
          <Row className="mt-2">
            <Col md="3">
              <strong>Selected Branch:</strong>
              <Button variant="link" onClick={() => navigate("ScheduleNotification/AddBranchDetails/" + "k")}>5</Button>
            </Col>
          </Row>
          <InputGroup className="mt-2">
            <FormControl
              // id="appendedInputButton"
              // maxLength="50"
              // type="text"
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              // placeholder="Search here..."
              id="appendedInputButton" maxLength="50" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search here.." />
            <Button variant="primary" size="md" onClick={"#"}>Search</Button>
            <Button variant="danger" size="md" className="ml-2" onClick={"#"}>Reset Sort</Button>
          </InputGroup>
          <Row className="mt-2">
            <Col md="3">
              <InputGroup>
                <input
                  // id={"checkbox"}
                  // name={"checkbox"}
                  // type={"checkbox"}
                  // onChange={selectAllBranchIdToArray}
                  // checked={isfilterSelectAll}
                  id={"checkbox"}
                  name={"checkbox"}
                  type={"checkbox"}
                  onChange={selectAllBranchIdToArray}
                  checked={isfilterSelectAll}
                />
                <strong>Select All</strong>
              </InputGroup>
            </Col>
            <Col md="3">
              <strong>Selected Branch</strong>
            </Col>
          </Row>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr>
                <th className="text-center">Select</th>
                <th className="text-center">Client Id</th>
                <th className="text-center">Customer Name</th>
                <th className="text-center">Branch Name</th>
                <th className="text-center">FO-C-S-M</th>
                <th className="text-center">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {selectbranchposts}
            </tbody>
          </Table>
          <hr />
          <div className="mt-2">
            {/* <Pagination>
              <Pagination.Item active>{curentPageNumber}</Pagination.Item>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index} onClick={() =>}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination> */}
            <Pagination
              activePage={curentPageNumber}
              pages={totalPages}

            ></Pagination>
          </div>
          <hr />
          <Button variant="success" size="md"
            onClick={'Save'}
          >
            Save
          </Button>
          <Button
            variant="primary"
            className="m-1"
            size="md"
            onClick={() => navigate("/ScheduleNotification/AddLanguageDetails/" + "k")}
          >
            Next
          </Button>
        </CardBody>
      </Card>
    </div >

  )
}

export default AddUsersDetails