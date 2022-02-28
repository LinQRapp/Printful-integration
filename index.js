const axios = require("axios").default;
const FormData = require('form-data');

const LINQR_RAPIDAPI_KEY = 'LINQR_RAPIDAPI_KEY';
const IMG_BB_KEY = 'IMG_BB_KEY';
const PRINTFUL_API_KEY = 'PRINTFUL_API_KEY';

axios.defaults.validateStatus = function () {
    return true;
};

async function call_sequence() {
    /**
     * QRCode generation 
     */
    const linqr_response = await axios.post(
        'https://qrcode3.p.rapidapi.com/qrcode/text',
        {
            data: 'https://linqr.app',
            image: {
                /**
                 * Instead of downloading an image from external server every time, 
                 * consider to use LinQR storage to speedup requests
                 */
                uri: 'https://avatars.githubusercontent.com/u/87969873',
                modules: false
            },
            style: {
                module: { color: '#69646E' },
                inner_eye: { color: '#D7928B' },
                outer_eye: { color: '#668A78' },
            },
            size: { width: 400 },
            output: { format: 'png' }
        },
        {
            headers: { 'x-rapidapi-key': LINQR_RAPIDAPI_KEY },
            responseType: 'stream'
        }
    );

    /**
     * Storing image at ImgBB for 60 seconds.
     * It will be available as an downloadable URL
     */
    const form_data = new FormData();
    form_data.append('expiration', 60);
    form_data.append('key', IMG_BB_KEY);
    form_data.append('image', linqr_response.data);

    const imgbb_response = await axios.post(
        'https://api.imgbb.com/1/upload',
        form_data,
        { headers: form_data.getHeaders() }
    );

    /**
     * POSTing image to the Printful API
     */
    const printful_response = await axios.post(
        'https://api.printful.com/files',
        {
            url: imgbb_response.data.data.image.url
        },
        { headers: { authorization: 'Basic ' + PRINTFUL_API_KEY } }
    );
}

call_sequence();
