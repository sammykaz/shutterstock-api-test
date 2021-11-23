const express = require('express');
const path = require('path');
const sstk = require('shutterstock-api');
const axios = require('axios');
const cors = require('cors');

//npm run build  in ./client to create build folder
//set path to client/build
const app = express();
const buildPath = path.join(__dirname, '..', 'client', 'build');

app.use(express.static(path.join(buildPath)));
app.use(cors());

const PORT = 4006;

//authentication method 1  (basic auth)
const appClientId = 'pMRj661IPX4LUGHEslx7NQGZzNSRfshJ';
const appClientSecret = 'DUWeVmpXEFGbmJQo';
sstk.setBasicAuth(appClientId, appClientSecret);

app.get('/ping', (req, res) => res.send('pong!'));

//authentication method 2 (token)

// axios
//   .get('https://api.shutterstock.com/v2/oauth/authorize', {
//     params: {
//       scope: 'licenses.create licenses.view purchases.view',
//       state: 'demo_' + Math.round(new Date() / 1000),
//       response_type: 'code',
//       redirect_uri: 'http://localhost:4006',
//       client_id: 'pMRj661IPX4LUGHEslx7NQGZzNSRfshJ',
//     },
//     // Don't follow the redirect because this program is not running in a browser
//     maxRedirects: 0,
//   })
//   .catch(({ response }) => {
//     // HTTP 302: Redirect
//     console.log(response.data);
//   });

// const body = {
//   client_id: 'pMRj661IPX4LUGHEslx7NQGZzNSRfshJ',
//   client_secret: 'DUWeVmpXEFGbmJQo',
//   grant_type: 'authorization_code',
//   expires: false,
//   code: 'pniMJXuj7BYqfRNMVDyGAX',
// };

// axios
//   .post('https://api.shutterstock.com/v2/oauth/access_token', body)
//   .then((res) => {
//     console.log(res);
//   });
const searchImages = async (req, res) => {
  const imagesApi = new sstk.ImagesApi();
  const queryParams = {
    query: 'kites',
    image_type: 'photo',
    page: 1,
    per_page: 5,
    sort: 'popular',
    view: 'minimal',
  };

  imagesApi
    .searchImages(queryParams)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

app.use('/images', searchImages);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
