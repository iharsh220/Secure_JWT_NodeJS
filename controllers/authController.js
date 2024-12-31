const { generateToken } = require('../utils/tokenUtils');
const users = [
    {
        id: 1,
        email: "testingemailone@gmail.com",
        password: "12345",
    },
    {
        id: 2,
        email: "testingemailtwo@gmail.com",
        password: "abcd@1234",
    }
]; // Dummy in-memory user data, replace with database logic.

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, email);
    res.json({ token });
};
