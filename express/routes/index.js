'use strict'
const { Router } = require('express')
const router = Router()

// Here we're just sending an html string to the client
const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`
// If we went with a three-layer model here it would be index -> service -> dao.
// Basically passing any inputs between the three in that order.
router.get('/', (req, res) => {
  res.send(root)
})

module.exports = router