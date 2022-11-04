import express, { Router } from 'express'

const router = Router()

// DB 
let id = 0;

const db = {
    users: [
        {
            id: ++id,
            name: 'Marta',
            surname: 'Trusohamn'
        },
    ],
};
// //////
router.use(express.json());

// GET method route
router.get('/users', (req, res) => {
    res.send(db.users)
})

// POST method route
router.post('/users', (req, res) => {
    const user = {
        id: ++id,
        ...req.body,
    };
    db.users.push(user);
    res.send(user)
})

export default router