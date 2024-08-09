const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connection = require('./Database');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const formRoutes = require("./routes/form");
const addFavRoutes = require("./routes/addFavorites")
const removeFavRoutes = require("./routes/removeFavorites")
const favoritesRoutes = require("./routes/favorites")
require('dotenv').config(); 
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
connection();
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes)
app.use("/api/favorites/:userId", addFavRoutes);
app.use("/api/favorites/:userId", removeFavRoutes);
app.use("/api/favorites/:userId", favoritesRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));