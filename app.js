const express = require('express')
const multer  = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, 'imgs/' )
	},
	filename: function (req, file, cb){
		const date = new Date();
		cb(null, date.toISOString()+ '.jpg')
	}
})
const fileFilter = (req, file, cb) => {
	// Accepter uniquement les fichiers image
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('only images are allowed!'), false);
	}
};
const upload = multer({
	limits: {
		fileSize: 5 * 1024 * 1024,
		files: 1
	},
	fileFilter: fileFilter,
	storage: storage
})

const app = express()
const port = 3000

app.use(express.static('imgs'))

app.get('/', (req, res) => {
	res.send('Static images service, send image at /imgs')
})
app.post('/imgs', upload.single('image'), (req, res) => {
	console.log( "IS OK " + req.file)
	res.sendStatus(200)
})
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
