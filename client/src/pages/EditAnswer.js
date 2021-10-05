import React from 'react';
import { Button, Form } from 'react-bootstrap';

const EditAnswer = () => {
  return (
    <div>
    <Form>
      <Form.Label>Edit Answer</Form.Label>
      <Form.Control type="text" placeholder="Edit Answer..." />
      <Button type="submit" variant="primary">Done</Button>
    </Form>
    </div>
  );
};

export default EditAnswer;