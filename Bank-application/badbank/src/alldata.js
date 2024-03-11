import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

export default function Alldata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/banks')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {data && data.length > 0 && data.map(item => (
        <Card key={item._id} style={{ width: '18rem', margin: '1rem' }}>
          <Card.Body>
            <Card.Title>{item.attributes.Name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Email: {item.attributes.Email}</ListGroup.Item>
              <ListGroup.Item>Balance: {item.attributes.Balance}</ListGroup.Item>
            </ListGroup>

          </Card.Body>
        </Card>
      ))}
    </>
  );
}
