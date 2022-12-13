import { Container, Form, Button, Row, Col } from "react-bootstrap";

const ForgotPasswordPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="border my-5 px-5 pb-3 pt-0 rounded">
            <div className="border-bottom py-2">
              <p className="font-bold text-center m-0">Forgot password?</p>
            </div>
            <div className="">
              <div className="py-2"></div>
              <Form noValidate>
                <Form.Group className="pb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Email" />
                  <Form.Text>
                    We&apos;ll never share your email with anyone
                  </Form.Text>
                </Form.Group>
                <Button
                  variant="danger"
                  type="submit"
                  className="btn-block w-100"
                >
                  Get password reset link
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;
