const express = require('express'); //Loading express code


//SS - express function
/*
application: {
    init: [Function: init],
    defaultConfiguration: [Function: defaultConfiguration],
    handle: [Function: handle],
    use: [Function: use],
    route: [Function: route],
    engine: [Function: engine],
    param: [Function: param],
    set: [Function: set],
    path: [Function: path],
    enabled: [Function: enabled],
    disabled: [Function: disabled],
    enable: [Function: enable],
    disable: [Function: disable],
    acl: [Function (anonymous)],
    bind: [Function (anonymous)],
    checkout: [Function (anonymous)],
    connect: [Function (anonymous)],
    copy: [Function (anonymous)],
    delete: [Function (anonymous)],
    get: [Function (anonymous)],
    head: [Function (anonymous)],
    link: [Function (anonymous)],
    lock: [Function (anonymous)],
    'm-search': [Function (anonymous)],
    merge: [Function (anonymous)],
    mkactivity: [Function (anonymous)],
    mkcalendar: [Function (anonymous)],
    mkcol: [Function (anonymous)],
    move: [Function (anonymous)],
    notify: [Function (anonymous)],
    options: [Function (anonymous)],
    patch: [Function (anonymous)],
    post: [Function (anonymous)],
    propfind: [Function (anonymous)],
    proppatch: [Function (anonymous)],
    purge: [Function (anonymous)],
    put: [Function (anonymous)],
    query: [Function (anonymous)],
    rebind: [Function (anonymous)],
    report: [Function (anonymous)],
    search: [Function (anonymous)],
    source: [Function (anonymous)],
    subscribe: [Function (anonymous)],
    trace: [Function (anonymous)],
    unbind: [Function (anonymous)],
    unlink: [Function (anonymous)],
    unlock: [Function (anonymous)],
    unsubscribe: [Function (anonymous)],
    all: [Function: all],
    render: [Function: render],
    listen: [Function: listen]
  },
  request: IncomingMessage {
    header: [Function: header],
    get: [Function: header],
    accepts: [Function (anonymous)],
    acceptsEncodings: [Function (anonymous)],
    acceptsCharsets: [Function (anonymous)],
    acceptsLanguages: [Function (anonymous)],
    range: [Function: range],
    query: [Getter],
    is: [Function: is],
    protocol: [Getter],
    secure: [Getter],
    ip: [Getter],
    ips: [Getter],
    subdomains: [Getter],
    path: [Getter],
    host: [Getter],
    hostname: [Getter],
    fresh: [Getter],
    stale: [Getter],
    xhr: [Getter]
  },
  response: ServerResponse {
    status: [Function: status],
    links: [Function (anonymous)],
    send: [Function: send],
    json: [Function: json],
    jsonp: [Function: jsonp],
    sendStatus: [Function: sendStatus],
    sendFile: [Function: sendFile],
    download: [Function: download],
    type: [Function: contentType],
    contentType: [Function: contentType],
    format: [Function (anonymous)],
    attachment: [Function: attachment],
    append: [Function: append],
    header: [Function: header],
    set: [Function: header],
    get: [Function (anonymous)],
    clearCookie: [Function: clearCookie],
    cookie: [Function (anonymous)],
    location: [Function: location],
    redirect: [Function: redirect],
    vary: [Function (anonymous)],
    render: [Function: render]
  },
  Route: [Function: Route],
  Router: [Function: Router] { Route: [Function: Route] },
  json: [Function: json],
  raw: [Function: raw],
  static: [Function: serveStatic],
  text: [Function: text],
  urlencoded: [Function: urlencoded]
*/


function block_1_basicServer() {
    return new Proomise((resolve) => {
        const app = express() // express ka code ab app ke andar hain
        app.use(express.json()) //JSON ko samjh jana

        app.get('/menu', (req,res) => { //This is handler registered by get on '/menu' endpoint
            //Client  (req)----> <----(res) Server

            res.json({ //we are sending serialised object. || (1) content-Type:'application/json'  (2) sending serialised response
                items:["thali", 'biryani']
            })
        })

        //handling queries
        app.get('/search', (req,res) => {
            //query handler /search/chai?order=1&price=10
            // ? se start hoga, fir alag alag values hongi
             //destructure whatever you like
            const {q,limit} = req.query;
            res.json({
                query: q,
                limit: limit || '10'
            })
        })

        //route params or path params
        //jab menu ke baad koi kuch likhega, toh woh equal ho jayega id ke
        app.get('/menu/:id', () => {
            //To get what user typed
            const {id} = req.params
            res.json({item:id})
        })


        //POST ROUTE
        app.post('/oder', (req,res) =>{
            const data = req.body //Post req mein hamesha jo data aata hai woh req.body 
            res.status(201).json({status:'created', order}) //yeh chainable object hain.
        })
//SS - server ka console

/*
Server {
  maxHeaderSize: undefined,
  insecureHTTPParser: undefined,
  requestTimeout: 300000,
  headersTimeout: 60000,
  keepAliveTimeout: 5000,
  connectionsCheckingInterval: 30000,
  requireHostHeader: true,
  joinDuplicateHeaders: undefined,
  rejectNonStandardBodyWrites: false,
  _events: [Object: null prototype] {
    request: [Function: app] {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      setMaxListeners: [Function: setMaxListeners],
      getMaxListeners: [Function: getMaxListeners],
      emit: [Function: emit],
      addListener: [Function: addListener],
      on: [Function: addListener],
      prependListener: [Function: prependListener],
      once: [Function: once],
      prependOnceListener: [Function: prependOnceListener],
      removeListener: [Function: removeListener],
      off: [Function: removeListener],
      removeAllListeners: [Function: removeAllListeners],
      listeners: [Function: listeners],
      rawListeners: [Function: rawListeners],
      listenerCount: [Function: listenerCount],
      eventNames: [Function: eventNames],
      init: [Function: init],
      defaultConfiguration: [Function: defaultConfiguration],
      handle: [Function: handle],
      use: [Function: use],
      route: [Function: route],
      engine: [Function: engine],
      param: [Function: param],
      set: [Function: set],
      path: [Function: path],
      enabled: [Function: enabled],
      disabled: [Function: disabled],
      enable: [Function: enable],
      disable: [Function: disable],
      acl: [Function (anonymous)],
      bind: [Function (anonymous)],
      checkout: [Function (anonymous)],
      connect: [Function (anonymous)],
      copy: [Function (anonymous)],
      delete: [Function (anonymous)],
      get: [Function (anonymous)],
      head: [Function (anonymous)],
      link: [Function (anonymous)],
      lock: [Function (anonymous)],
      'm-search': [Function (anonymous)],
      merge: [Function (anonymous)],
      mkactivity: [Function (anonymous)],
      mkcalendar: [Function (anonymous)],
      mkcol: [Function (anonymous)],
      move: [Function (anonymous)],
      notify: [Function (anonymous)],
      options: [Function (anonymous)],
      patch: [Function (anonymous)],
      post: [Function (anonymous)],
      propfind: [Function (anonymous)],
      proppatch: [Function (anonymous)],
      purge: [Function (anonymous)],
      put: [Function (anonymous)],
      query: [Function (anonymous)],
      rebind: [Function (anonymous)],
      report: [Function (anonymous)],
      search: [Function (anonymous)],
      source: [Function (anonymous)],
      subscribe: [Function (anonymous)],
      trace: [Function (anonymous)],
      unbind: [Function (anonymous)],
      unlink: [Function (anonymous)],
      unlock: [Function (anonymous)],
      unsubscribe: [Function (anonymous)],
      all: [Function: all],
      render: [Function: render],
      listen: [Function: listen],
      request: [IncomingMessage],
      response: [ServerResponse],
      cache: [Object: null prototype] {},
      engines: [Object: null prototype] {},
      settings: [Object: null prototype],
      locals: [Object: null prototype],
      mountpath: '/',
      router: [Getter]
    },
    connection: [Function: connectionListener],
    listening: [ [Function: setupConnectionsTracking], [Function] ],
    error: [Function: bound onceWrapper] { listener: [Function] }
  },
  _eventsCount: 4,
  _maxListeners: undefined,
  _connections: 0,
  _handle: TCP {
    reading: false,
    onconnection: [Function: onconnection],
    [Symbol(owner_symbol)]: [Circular *1]
  },
  _usingWorkers: false,
  _workers: [],
  _unref: false,
  _listeningId: 2,
  allowHalfOpen: true,
  pauseOnConnect: false,
  noDelay: true,
  keepAlive: false,
  keepAliveInitialDelay: 0,
  highWaterMark: 65536,
  httpAllowHalfOpen: false,
  timeout: 0,
  maxHeadersCount: null,
  maxRequestsPerSocket: 0,
  _connectionKey: '6::::0',
  [Symbol(IncomingMessage)]: [Function: IncomingMessage],
  [Symbol(ServerResponse)]: [Function: ServerResponse],
  [Symbol(shapeMode)]: false,
  [Symbol(kCapture)]: false,
  [Symbol(async_id_symbol)]: 4,
  [Symbol(kUniqueHeaders)]: null
}
*/
        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`

            //WE will write here frontend

            try {
                //Hitting /menu endpoint
                const menuRes = await fetch(`${base}/menu`)
                const menuData = menuRes.json()
                console.log('GET /menu', JSON.stringify(menuData))

                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                const query = await fetch(`${base}/search?q=biryani&limit=5`)
                const resQuery = query.json()
                console.log('GET /search' ,JSON.stringify(resQuery))
                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                const order = await fetch(`${base}/menu/chai`)
                const parsedOrder = order.json()
                console.log('GET /menu', JSON.stringify(parsedOrder))
                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                const orderRes = await fetch(`${base}/order`, {
                    method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json',
                        body: JSON.stringify({dish: 'biryani', quantiyt: 2})
                    }})
                    const orderData = await orderRes.json()
                    console.log('GET /menu', JSON.stringify(orderData))
                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                    
            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Block 1 Served")
                resolve()
            })
        })
    })
}

function basic_1_response() {
    return new Promise((resolve) => {
        const app = express()

        app.get('/text', (req,res) => {
            res.send("Hello from China")
        })

        app.get('/json', (req,res) => {
            res.json({
                framework: 'express',
                version: '54'
            })
        })

        app.get('/not-found', (req,res) => {
            res.status(404).json({error: "Page not found"})
        })

        app.get('/health', (req,res) => {
            res.sendStatus(200).json()
        })

        //redirecting from address to another address
        app.get('/old-address', (req,res) => {
            res.redirect(301, '/new-address') //Yeh old-address wale ko new-address par bhej dega.
        })

        app.get('xml', (req,res) => {
            res.type('application/xml').send('<dish>name</dish>')
        })

        app.get('/custom-headers', (req,res) => {
            res.set('X-powered-By', 'ChaiCode');
            res.set('X-Custom-By', "1231") //Custom headers mein 'X-' lagana jaroori hain [It's just standard]
        })

        app.get('/no-content', (req,res) => {
            res.statusCode(204).end() //Jab endpoint exist karta ho, par content na ho serve karne ke liye. tab iska use karte hain.
        })


         const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`
         })
})
}

async function main() {
    await block_1_basicServer()
    await block_1_response()
     
    process.exit()// Program execute karna band kar dega. By default: 0 hoti hain success ke liye.
} 
main()