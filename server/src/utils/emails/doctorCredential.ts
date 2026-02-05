export const doctorCredentialsEmail = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => `
    <h2>Welcome to MediQueue</h2>
  
    <p>Your doctor account has been created.</p>
  
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Temporary Password:</strong> ${password}</p>
  
    <p>Please log in and change your password immediately.</p>
  
    <br/>
    <p>— MediQueue Team</p>
  `;
  