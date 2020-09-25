const express = require('express')
const Users = require('../db/models/users');
const auth = require('../middleware/auth');
// const getUser = require('../middleware/getUser');
const multer = require('multer');
const router = new express.Router()
const avatar = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
            return cb(new Error('This is not a correct format of the file'))
        cb(undefined, true)
    }
})

router.get('/superuser', async (req, res) => {
    const user = await Users.findByCredentials({ superuser: true })
    const token = await user.generateAuthToken()
    try {
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})
router.get('/users', auth, async (req, res) => {
    const users = await Users.find()
    try {
        res.status(200).send({ users })
    } catch (e) {
        res.status(400).send(e.message)
    }
})
router.post('/users', auth, async (req, res) => {
    const user = new Users(req.body)
    try {
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send(req.user)
}, (err, req, res, next) => res.status(404).send({ error: err }))

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user || !user.avatar)
            throw new Error()

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send('image not found')
    }

})
router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})
router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['username', 'password']
    const keys = Object.keys(req.body)
    const isUpdationValid = keys.every(key => allowedUpdates.includes(key))
    if (!isUpdationValid)
        res.status(400).send()
    try {
        keys.forEach(update => req.user[update] = req.body[update])
        await req.user.save();
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

router.patch('/users/:id',auth, async (req, res) => {
    try {
        const updatedpost = await Users.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    EmpolyeName: req.body.EmpolyeName,
                    Mobile: req.body.Mobile,
                    City: req.body.City,
                    Gender: req.body.Gender,
                    Department: req.body.Department,
                    Haier_Date: req.body.Haier_Date,
                    admin: req.body.admin,
                    Salary: req.body.Salary,

                }
            }
        )
        res.status(200).send(updatedpost)
    } catch (error) {
        res.status(400).send()
    }

})

router.delete('/users/:id', auth, async (req, res) => {
    try {
        const task = await Users.remove({ _id: req.params.id })
        if (!task)
            return res.status(404).send('Not found!')
        res.status(200).send(task)

    } catch (e) {
        res.status(400).send('error')
    }
})
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router