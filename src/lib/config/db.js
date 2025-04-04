import mongoose from "mongoose";


export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://abdullahibashirtwd:Abbtwd2019@cluster0.lzxyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Db Connext")
}