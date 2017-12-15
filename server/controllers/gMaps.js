var mongoose=require('mongoose')

module.exports={
  search:(req,res)=>{
    const yelp = require('yelp-fusion');
    const clientSecret='ANqO2QbG9OpAuD2oqQG6v8hokiGrmHjRi61HUcCyeVJXBDZbWaV4xpIGe6TPhwV0'

    const clientId='eUu7kgPVS21iByX2qX-SLQ'
    yelp.accessToken(clientId, clientSecret).then(response => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search({
        term:'bars',
        location:req.body.location,
        price:1,
        limit:10,
        sort_by: 'distance',
        open_now: true
      }).then(response=>{
        res.json(response.jsonBody.businesses);
      })
      .catch(errors=>{
        return res.json(errors)
      })
    })
  },
  geo:(req,res)=>{
    const yelp = require('yelp-fusion');
    const clientSecret='ANqO2QbG9OpAuD2oqQG6v8hokiGrmHjRi61HUcCyeVJXBDZbWaV4xpIGe6TPhwV0'

    const clientId='eUu7kgPVS21iByX2qX-SLQ'
    yelp.accessToken(clientId, clientSecret).then(response => {
      const client = yelp.client(response.jsonBody.access_token);
      client.search({
        term:'Bar',
        latitude:req.body.lat,
        longitude:req.body.long,
        price:1,
        limit:10
      }).then(response=>{
        res.json(response.jsonBody.businesses);
      })
    }).catch(errors=>{
      res.json('oh no it didnt go through',errors)
    })

  }
}
