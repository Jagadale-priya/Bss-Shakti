import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import urlData from '../../../UrlData';
import errorHandler from '../../../reusable/ErrorHandler';
import encrypt from '../../../views/Encryption/encrypt';
import decrypt from '../../../views/Encryption/decrypt';
import LoadingComponent from '../../../reusable/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import '../../Stylee.css'

// Importing necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MostBrowsedPageData() {
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [pageData, setPageData] = useState([]);
  const [pageLabel, setPageLabel] = useState([]);
  const [pageColor, setPageColor] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mdata, setMData] = useState(null);
  const [adata, setAData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const mNData = localStorage.getItem('mN');
      const userData = localStorage.getItem('data');

      if (mNData && userData) {
        setMData(decrypt(JSON.parse(mNData).subContent));
        setAData(decrypt(JSON.parse(userData)));
      } else {
        throw new Error('Required local storage data is missing or corrupted.');
      }
    } catch (error) {
      setErrorCode('Error decrypting local storage data.');
    }
  }, []);

  useEffect(() => {
    if (mdata && adata) {
      getData();
    }
    // eslint-disable-next-line
  }, [mdata, adata]);

  const getData = () => {
    setLoading(true);
    setErrorCode(''); // Clear any previous errors

    const data = { mobileNumber: mdata?.mobileNumber };
    const url = new URL(urlData + 'admin/getMostBrowsedPages');
    const headers = { Authorization: adata?.authToken };

    try {
      const encryptedData = encrypt(data);
      axios
        .post(url, encryptedData, { headers })
        .then(async (response) => {
          try {
            const decryptedData = await decrypt(response.data.data);
            setPageLabel(decryptedData.pieChartData.map((t) => t.title));
            setPageData(decryptedData.pieChartData.map((t) => t.value));
            setPageColor(decryptedData.pieChartData.map((t) => t.color));
            setVisible(true);
            setLoading(false);
          } catch (decryptionError) {
            setErrorCode('Error decrypting response data.');
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate('/');
          }
          else if (error.response.status === 429) {
            navigate('/')
          } else if (error.response.status === 404) {
            navigate('/404')
          } else if (error.response.status === 500) {
            navigate('/500')
          }
          else {
            setErrorCode(errorHandler(error));
            setLoading(false);
          }
        });
    } catch (encryptionError) {
      setErrorCode('Error encrypting request data.');
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    // <Row className='mt-4 mx-5'>
    //   <Col xs={12} lg={12}>
    //     <Card>
    //       <CardHeader className="align-items-left">
    //         <span>
    //           <strong>Most Pages Browsed In Last 24 Hours</strong>
    //         </span>
    //         <Button variant="link" className="p-0 ms-2" onClick={getData}>
    //           Refresh Data
    //         </Button>
    //       </CardHeader>
    //       <CardBody className="text-left">
    //         {visible ? (
    //           <Bar
    //             data={{
    //               labels: pageLabel,
    //               datasets: [
    //                 {
    //                   label: 'Most Pages Browsed In Last 24 Hours',
    //                   backgroundColor: pageColor,
    //                   data: pageData,
    //                 },
    //               ],
    //             }}
    //             options={{
    //               plugins: {
    //                 title: {
    //                   display: true,
    //                   text: 'Most Browsed Pages',
    //                 },
    //               },
    //             }}
    //           />
    //         ) : (
    //           <p className="mt-2 text-danger">{errorCode || 'No data available.'}</p>
    //         )}
    //       </CardBody>
    //     </Card>
    //   </Col>
    // </Row>
    <Row className="mt-4 mx-0">
      <Col xs={12} lg={12}>
        <Card>
          <Card.Header className="d-flex cardHeader flex-column flex-md-row justify-content-between align-items-center">
            <span>
              <strong>Most Pages Browsed In Last 24 Hours</strong>
            </span>
            {/* <button
              variant="link"
              className="pt-2 ButtonsCss RefreshButton"
              style={{ width: 'auto', minWidth: '100px', border: 'none', boxShadow: 'none' }}
              onClick={getData}
            >
              Refresh Data
            </button> */}
            <button
              className="btn  flex-grow-1 mt-2"
              onClick={getData}
              style={{
                maxWidth: '150px',
                width: '100%',
                backgroundColor: '#159BD8',
                border: 'none',
                color: 'white',
                // padding: '10px',
                fontSize: '16px',
                margin: '0px',
                cursor: 'pointer', // Ensures the button is clickable
              }}
            >
              Refresh Data
            </button>
          </Card.Header>



          <Card.Body className="text-left">
            {visible ? (
              <Bar
                data={{
                  labels: pageLabel,
                  datasets: [
                    {
                      label: 'Most Pages Browsed In Last 24 Hours',
                      backgroundColor: pageColor,
                      data: pageData,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Most Browsed Pages',
                    },
                  },
                }}
              />
            ) : (
              <p className="mt-2 text-danger">{errorCode || 'No data available.'}</p>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>

  );
}

export default MostBrowsedPageData;
