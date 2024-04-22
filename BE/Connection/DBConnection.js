import mongoose from 'mongoose';

async function connect () {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/BestCV');
    console.log('Connect Successfully!!!');
  } catch (error) {
    console.log(error);
    console.log('Connect failure!!!');
  }
};

export  {connect};