import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    const {title, content, destination, label} = data;

return (
    <Row>
        <Col className="p-5">
            <h1>{title}</h1>
            <p>{content}</p>
            {/*<Link to={destination}>{label}</Link>*/}
            <Button variant="primary" as={Link} to={destination} >{label}</Button>

        </Col>
    </Row>
    )
}
