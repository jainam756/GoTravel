const express = require("express");
var cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Usermodel = require("./models/User");
// const Booking=require("./models/Booking");
const Place=require("./models/Place");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer=require('multer');
const upload = multer({ dest: "uploads/" });
const fs=require('fs');
const BookingModel = require("./models/Booking");



const app = express();
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "helloworlefsedvbfbdbrdrsffjwewe";

// app.get("/post", (req, res) => {
//   res.json("test ok");
// });

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await Usermodel.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user); //user.save() also do the same
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get("/login", async (req, res) => {
  console.log(USERNAME);
  res.json(USERNAME);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await Usermodel.findOne({ email });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      console.log("pass ok");
      jwt.sign(
        {
          email: foundUser.email,
          id: foundUser._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          console.log("setting-cookie");
          res.cookie("token", token).json(foundUser);
          console.log("cookie has been set");
        }
      );
    } else {
      console.log("PASS NOT OK");
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(422).json("user not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, result) => {
      if (err) throw err;
      const { name, email, _id } = await Usermodel.findById(result.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json("not OK");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" +Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});


app.post('/upload',upload.array('photos',100),(req,res)=>{
  const uploadedPhotos=[];
  for(let i=0;i<req.files.length;i++){
    const {path,originalname,filename}=req.files[i];
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newname=filename+'.'+ext;
    const newpath=path+'.'+ext;
    fs.renameSync(path,newpath);
    uploadedPhotos.push(newname);
  }
  res.json(uploadedPhotos);
  
  console.log(req.files);
})


app.post("/addplace",(req,res)=>{
  const {token}=req.cookies;
  const {title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,
    price,}=req.body;
  jwt.verify(token,jwtSecret,{},async(err,result)=>{
    if (err) throw err;
    const userData=await Usermodel.findById(result.id);
    const placeDoc=await Place.create({
      owner:userData._id,
      title,address,perks,extraInfo,checkIn,checkOut,price,description,maxGuests,
      photos:addedPhotos
    })
    res.json(placeDoc);
  })

})

app.get('/user-places',async(req,res)=>{
  const {token}=req.cookies;
  jwt.verify(token,jwtSecret,{},async(err,result)=>{
    if (err) throw err;
    const userData=await Usermodel.findById(result.id);
    const userPlaces=await Place.find({owner:userData._id});
    
    res.json(userPlaces);
  })
})

app.get("/places/:id",async(req,res)=>{
  const id=req.params.id;
  const placeDetail=await Place.findById(id);
  res.json(placeDetail);
})


app.put('/places/:id',async(req,res)=>{
  const {token}=req.cookies;
  const place_id=req.params.id;
  const {title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,
    price,}=req.body;
  jwt.verify(token,jwtSecret,{},async(err,result)=>{
    if (err) throw err;
    // const userData=await Usermodel.findById(result.id);
    const foundPlace=await Place.findById(place_id);
    // console.log(userPlaces.owner);
    // console.log(result.id);
    if(foundPlace.owner.toString()===result.id){
      foundPlace.set({title,address,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
        price,photos:addedPhotos})
      
      await foundPlace.save();
      res.json('ok');
    }
  
  })
})


app.get("/places",async (req,res)=>{
  res.json(await Place.find({}));
})


app.post("/bookings",async(req,res)=>{
  const {token}=req.cookies;
  let id='';
  jwt.verify(token,jwtSecret,{},async(err,result)=>{
    if (err) throw err;
    id=result.id;
  })
  const {checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    place,
    price}=req.body;
  const bookdetails=await BookingModel.create({
    customer:id,
    checkIn,checkOut,numberOfGuests,name,phone,place,price
  })
  res.json(bookdetails);
})

app.get("/bookings/:id",async(req,res)=>{
  const booking_id=req.params.id;
  res.json(await BookingModel.findById(booking_id));
})

app.get("/user-bookings",async(req,res)=>{
  const {token}=req.cookies;
  let id='';
  jwt.verify(token,jwtSecret,{},async(err,result)=>{
    if (err) throw err;
    id=result.id;
  })
  const userbookings=await BookingModel.find({customer:id})
  res.json(userbookings);
})

app.listen(4000, function (req, res) {
  console.log("server started on port 4000");
});
