import { AuthContext } from "../context/AuthContext";

const Home = () => 
  <AuthContext.Consumer>
    {
      ({ isLoggedIn, email, accessToken, role }) => (
        <>
        <span>this is the home component</span>
        <ul>
          <li>isLoggedIn: {isLoggedIn ? 'true' : 'false'} </li>
          <li>email: {email} </li>
          <li>accessToken: {accessToken} </li>
          <li>role: {role} </li>
        </ul>
        </>
      )
    }
  </AuthContext.Consumer>
;

export default Home;
