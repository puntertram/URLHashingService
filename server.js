const express = require("express");

const PORT = process.env.PORT||8000;

let app = express();

app.use('/api/url/', require('./app/index'));
app.use('/api/auth/', require('./authentication/index'));
app.use(require('/api/db/', './db/index'));
app.use(require('/api/kgs/', './kgs/index'));



app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})