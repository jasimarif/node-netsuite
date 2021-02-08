const express = require("express")
const stripe = require('stripe')('sk_test_51HHkI8H6xcjxGHH6wkB20LfjG79VahkqvJyM4BqnZ4VQHobu1p2fe2Q2lZaGotZBxurSKv8YaO1YcKw3RAPjVO5p008QnlsNLK');
var request = require('request');
const bodyParser = require('body-parser');
const { response } = require("express");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("COngratsss")
})

app.post("/webhooks", (req, res) => {
    try {
        console.log("/webhooks POST route hit! req.body: ", req.body)
        postObject = req.body
        req.headers['someHeader'] = 'someValue'
        callSuitlelet(req.body)
        res.sendStatus(200)

}
    catch (err) {
        console.log("/webhooks route error: ", err)
        res.sendStatus(404)
    }
})
 

function  callSuitlelet(obj) {
    const url="https://tstdrv1019523.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=792&deploy=1&compid=TSTDRV1019523&h=e9ce716184022a4abffb"
    request({ url, json: true,
        method:"POST",
        body:obj,
        // headers: {
        //     "User-Agent": "Mozilla/5.0",
        // }
    }, 
    (error, response,body) => {
        if (error) {
            console.log('Unable to connect to suitelet', body)
        }
        else{
            console.log(`response ${response}`)
        }
    })

    // request({
    //     url:"https://tstdrv1019523.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=792&deploy=1&compid=TSTDRV1019523&h=e9ce716184022a4abffb",
    //     method: "POST",
    //     json: true,   // <--Very important!!!
    //     body: obj
    // }, function (error, {body}) {
    //     console.log(body);
    // });

}
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is up on port 80.')
})


// const webhookEndpoint = await stripe.webhookEndpoints.create({
//   url: 'https://example.com/my/webhook/endpoint',
//   enabled_events: [
//     'charge.failed',
//     'charge.succeeded',
//   ],
// });