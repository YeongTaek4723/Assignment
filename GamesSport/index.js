const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

app.use(
        cors({
                origin:'http://13.125.71.97:3000',
                credentials : true,
        })
);


app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './', 'front', 'test.html'));
});



app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
});

