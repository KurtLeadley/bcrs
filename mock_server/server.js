const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

// create server
const server = jsonServer.create()
// add express router
const router = jsonServer.router('database.json')
// read from the users json file
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
// add body parser middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
// set default middleware
server.use(jsonServer.defaults())

// env variables for jwt
const SECRET_KEY = 'top-secret-key'
const expiresIn = '2h'

// Create a token from payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  )
}

// Check if user exist
function isAuthenticated({ username, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  )
}

// Register user/Create user
server.post('/auth/register', (req, res) => {
  console.log(`Register endpoint called; Request body: ${req.body}`)
  const {
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    street,
    city,
    state,
    zipCode,
    password,
  } = req.body

  if (isAuthenticated({ username, password }) === true) {
    const status = 400
    const message = 'username already exist'
    res.status(status).json({
      status,
      message,
    })
    return
  }

  fs.readFile('./user.json', (err, data) => {
    if (err) {
      const status = 400
      const message = err
      res.status(status).json({
        status,
        message,
      })
      return
    }

    // get current user data
    var data = JSON.parse(data.toString())
    // Get id of last user in the users array
    var last_item_id = data.users[data.users.length - 1]._id

    // Add new user
    data.users.push({
      _id: last_item_id + 1,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      password: password,
    })
    var writeData = fs.writeFile(
      './users.json',
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 400
          const message = err
          res.status(status).json({
            status,
            message,
          })
          return
        }
      }
    )
  })

  // Create token for new user
  const token = createToken({ username, password, role })
  console.log(`Token: ${token}`)
  res.status(201).json({
    status,
    token,
  })
})

// login route
server.post('/auth/login', (req, res) => {
  console.log(`Login endpoint called; Request body: ${req.body}`)
  const { username, password } = req.body
  if (isAuthenticated({ username, password }) === false) {
    const status = 401
    const message = 'Invalid credentials!'
    res.status(status).json({
      status,
      message,
    })
    return
  }
  const token = createToken({ username, password })
  console.log(`Token: ${token}`)
  res.status(200).json({ token })
})

server.get('/auth/me', (req,res) => {
  console.log('get-me');
})

// add middleware to check authorization header
// and pass token along to all other routes
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401
    const message = 'Bad Auth Header'
    res.status(status).json({
      status,
      message,
    })
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    const status = 401
    const message = 'ERROR: token is not valid!'
    res.status(status).json({
      status,
      message,
    })
  }
})

// Mount json server and run on port 3000
server.use(router)

server.listen(3000, () => {
  console.log('Auth API Server is running on port 3000')
})
