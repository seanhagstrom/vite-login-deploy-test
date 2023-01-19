export const authenticateUser = async (username, password, method) => {
  console.log('authenticating user! method type: ', username, 'and', password);
  try {
    const response = await fetch(`/api/users/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();
    console.log(result);
    if (!result.token) {
      return;
    } else {
      window.localStorage.setItem('fit-token', result.token);

      return await me();
    }
  } catch (error) {
    console.error(error);
  }
};

export const me = async () => {
  try {
    const token = window.localStorage.getItem('fit-token');

    if (token) {
      const response = await fetch(`/api/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const data = await response.json();
      // const { username, id } = await response.json();
      console.log('hey look it is me: ', data);
      return data;
      // return { username, id };
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};
