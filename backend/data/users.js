import bcrypt from 'bcryptjs';
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Anne Doe',
    email: 'annedoe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];
export default users;
