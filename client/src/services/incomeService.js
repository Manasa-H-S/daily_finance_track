const BASE_URL =
  process.env.REACT_APP_API_URL;

const API_URL =
  `${BASE_URL}/income`;

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization:
    `Bearer ${localStorage.getItem('token')}`,
});

export const getIncome =
  async () => {
    const res = await fetch(
      API_URL,
      {
        headers: headers(),
      }
    );

    return res.json();
  };

export const updateSalary =
  async (amount) => {
    const res = await fetch(
      `${API_URL}/salary`,
      {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({
          amount,
        }),
      }
    );

    return res.json();
  };

export const addIncome =
  async (income) => {
    const res = await fetch(
      API_URL,
      {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(income),
      }
    );

    return res.json();
  };