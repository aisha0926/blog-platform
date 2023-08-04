import User from "../../models/User.js";
import fs from "fs";

const updateUserProfile = async (req, res) => {
  const updatedData = req.body;

  try {
    // check if the user is authenticated
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    // get authenticated user id from
    const { userId } = req.user;

    //Find the user by the userId
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check for the uniqueness of the new username and email
    const existingUsername = await User.findOne({
      username: updatedData.username,
    });
    const existingEmail = await User.findOne({ email: updatedData.email });

    if (existingUsername && existingUsername._id.toString() !== userId) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    if (existingEmail && existingEmail._id.toString() !== userId) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // Check if a new image file was uploaded
    if (req.file) {
      //Delete the previous avatar if its exists
      if (user.avatar) {
        fs.unlinkSync(user.avatar);
      }
      const imagePath = req.file.path;
      user.avatar = imagePath;
    }
    //update user profile with new data
    user.username = updatedData.username || user.username;
    user.email = updatedData.email || user.email;
    user.firstName = updatedData.firstName || user.firstName;
    user.lastName = updatedData.lastName || user.lastName;
    user.bio = updatedData.bio || user.bio;

    await user.save();

    res.status(200).json({ message: "Profile update successful", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Updating Profile failed", error: error.message });
  }
};

export default updateUserProfile;