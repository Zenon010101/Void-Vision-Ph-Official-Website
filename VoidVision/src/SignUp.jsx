import './SignUp.css';

function SignUp() {
  return (
    <div className="signup-page">
      <h1>Sign Up for Void Vision</h1>
      <form className="signup-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp;