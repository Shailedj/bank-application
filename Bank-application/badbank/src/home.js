import img from './images/bank.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Home() {
  return (
    <Card style={{ width: '35%',margin:"2% 30%" }}>
        <Card.Title style={{margin:"3% 35%",color:"cadetblue",fontWeight:"bold",fontSize:"200%"}}>BadBank</Card.Title>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        
        <Card.Text style={{margin:"2% 10%",color:"orangered",fontWeight:"bold",fontSize:"200%"}}>
          Welcome to Our Bank
        </Card.Text>
        <Button variant="primary" style={{margin:"0 29%"}}><a href='#/create' style={{textDecoration:"none",color:"white"}}>Create your Account</a></Button>
      </Card.Body>
    </Card>
  );
}




