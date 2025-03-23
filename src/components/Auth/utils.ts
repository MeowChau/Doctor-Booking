import moment from 'moment';
import { saveUser } from '../../utils/localStorage';

export const validateAndSaveUser = (
  email: string,
  password: string,
  fullName: string,
  phoneNumber: string,
  dateOfBirth: string | null
): { success: boolean; error?: string } => {
  if (!dateOfBirth) {
    return { success: false, error: 'Please select your date of birth!' };
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    return { success: false, error: 'Phone number must be exactly 10 digits!' };
  }

  const birthYear = moment(dateOfBirth).year();
  if (birthYear >= 2020) {
    return { success: false, error: 'Date of birth must be before the year 2020!' };
  }

  if (!email.endsWith('@gmail.com')) {
    return { success: false, error: 'Email must end with @gmail.com!' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password is too weak! It must be at least 6 characters.' };
  }

  try {
    saveUser(email, password, fullName, phoneNumber, dateOfBirth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
