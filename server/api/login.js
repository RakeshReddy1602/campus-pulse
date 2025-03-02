export default defineEventHandler(async (event) => {
    // Retrieve the request body directly (without useBody)
    const body = await readBody(event);
  
    // Extract username and password from the body
    const { username, password } = body;
  
    // Dummy validation (Replace with real validation logic)
    if (username === 'admin' && password === 'admin') {
      return {
        status: 'success',
        message: 'Login successful!',
        data: {
          user: {
            username: 'admin',
            email: 'admin@example.com'
          }
        }
      };
    } else {
      return {
        status: 'failure',
        message: 'Invalid username or password.'
      };
    }
  });
  