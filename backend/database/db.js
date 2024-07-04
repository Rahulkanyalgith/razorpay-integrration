import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect('mongodb://0.0.0.0:27017/' , {
        dbName : "razorpaydatabase"
    });
    console.log("Database Connected Successfully")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;