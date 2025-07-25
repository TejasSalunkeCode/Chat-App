import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/Socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUsersForSidebar ", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                { senderId: myId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: myId },
            ],
        })
         res.status(200).json(message)

    } catch (error) {
        console.log("Error in getMessage controller : ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const sendMessage = async (req, res) => {
    try {


        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //upload basse 64 image to cloudinary
            const uploadresponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadresponse.secure_url;
        }

        const newMesage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        });

        await newMesage.save();

        //todo: realtime functionlity goes here =>socket.io
        const receiverSocketId=getReceiverSocketId(reciverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMesage);
        }



    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



// import User from "../models/user.model.js";
// import Message from "../models/message.model.js";

// import cloudinary from "../lib/cloudinary.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

// export const getUsersForSidebar = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;
//     const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

//     res.status(200).json(filteredUsers);
//   } catch (error) {
//     console.error("Error in getUsersForSidebar: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const myId = req.user._id;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receiverId: userToChatId },
//         { senderId: userToChatId, receiverId: myId },
//       ],
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let imageUrl;
//     if (image) {
//       // Upload base64 image to cloudinary
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//     });

//     await newMessage.save();

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };