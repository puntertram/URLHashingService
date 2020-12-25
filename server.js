const express = require("express");

const PORT = process.env.PORT||8000;

let app = express();

app.use('/api/url/', require('./app/index'));
app.use('/api/auth/', require('./authentication/index'));
app.use('/api/db/', require('./db/index'));
app.use('/api/kgs/', require('./kgs/index'));




app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})