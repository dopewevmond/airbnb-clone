import { Container, Form, Button, Row, Col } from "react-bootstrap";

const SignupPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="border my-5 px-5 pb-3 pt-0 rounded">
            <div className="border-bottom py-2">
              <p className="text-bold text-center m-0">Sign up</p>
            </div>
            <div className="">
              <div className="py-2"></div>
              <Form noValidate>
                <Form.Group className="pb-4">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="First name" />
                  <Form.Text>
                    We&apos;ll never share your name with anyone
                  </Form.Text>
                </Form.Group>
                <Form.Group className="pb-4">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text" placeholder="Last name" />
                  <Form.Text>
                    We&apos;ll never share your name with anyone
                  </Form.Text>
                </Form.Group>
                <Form.Group className="pb-4">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Email address" />
                  <Form.Text>
                    We&apos;ll never share your email with anyone
                  </Form.Text>
                </Form.Group>
                <Form.Group className="pb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                  <Form.Text>Passwords are securely stored</Form.Text>
                </Form.Group>
                <Button
                  variant="danger"
                  type="submit"
                  className="btn-block w-100"
                >
                  Sign up
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
