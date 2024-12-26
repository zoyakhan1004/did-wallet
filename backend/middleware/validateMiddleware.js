const validateUser = (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
};

const validateCredential = (req, res, next) => {
    const { name, value, type } = req.body;
    
    if (!name || !value || !type) {
        return res.status(400).json({ message: 'Name, value and type are required' });
    }

    next();
};

module.exports = { validateUser, validateCredential };
