export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const saveUser = (email: string, password: string, fullName: string, phoneNumber: string, dateOfBirth: string): void => {
  const users = getFromLocalStorage('users') || [];
  if (users.some((user: { email: string }) => user.email === email)) {
    throw new Error('Email already exists!');
  }
  users.push({ email, password, fullName, phoneNumber, dateOfBirth });
  saveToLocalStorage('users', users);
};

export const findUser = (email: string, password: string): { success: boolean; error?: string } => {
  const users = getFromLocalStorage('users') || [];
  const user = users.find((user: { email: string; password: string }) => user.email === email);

  if (!user) {
    return { success: false, error: 'Email not found!' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Incorrect password!' };
  }

  return { success: true };
};