const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/expenses`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

export const getExpenses = async () => {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }

    return await response.json();
};

export const addExpense = async (expense) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(expense),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const updateExpense = async (expense) => {
    const response = await fetch(
        `${API_URL}/${expense.id}`,
        {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(expense),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
};

export const deleteExpense = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};
