let gMaps = require('./../controllers/gMaps');
let path = require('path');

module.exports = (app)=>{
  app.post('/api/search', gMaps.search)
  app.post('/api/geo', gMaps.geo)


	app.all('*', (req, res) => {
		res.sendFile(path.resolve('./public/dist/index.html'));
	})
}
