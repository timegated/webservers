'use strict'

function aLotOfHellos() {
  let text = [];
  const arr = Array.from(Array(100).keys());

  arr.forEach((item) => {
    text.push('<h1>^_^</h1>');
  });

  return text;
}

const hello = `
<html>
  <head>
    <style>
      body {
        background: #EFEFEF;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: center;
      }
      h1 {
        color: #004D26;
        animation: 0.5s 10 grow ease;
        text-align: center;
      }
      @keyframes grow {
        0% {
          font-size: 10px;
        }
        25% {
          font-size: 15px;
        }
        50% {
          font-size: 20px;
        }
        75% {
          font-size: 25px;
        }
        100% {
          font-size: 30px;
        }
      }
    </style>
  </head>
  <body>
    <div style="display: flex; flex-direction: row;flex-flow: wrap">
      ${aLotOfHellos().map((item) => item).join('')}
    </div>
  </body>
</html>
`

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.type('text/html')
    return hello
  })
}