const express = require("express");

const PORT = process.env.PORT||8000;

let app = express();


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})