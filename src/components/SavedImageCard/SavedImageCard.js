import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import './SavedImageCard.css'

export default function SavedImageCard({image, city, index, onDelete}) {
    return (
        <div className="c-saved-image-card">
            <Card style={{ width: '18rem' }}>
                <Row className='no-gutters'>
                    <Col className="col-md-7 c-tenant-img">
                        <Card.Img variant="top" src={image} />
                    </Col>
                    <Col className="col-md-5 c-tenant-info">
                        <Card.Body>
                            <Card.Text>{city}</Card.Text>
                            <div className="saved-image-card-bottons">
                                <Button variant="light" onClick={() => onDelete(index)}><i className="bi bi-x text-danger"></i></Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>    
            </Card>
        </div>
    )
}
