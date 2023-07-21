import User from "../../models/User.js";

const updateUserProfile = async (req, res) => {
  const { userId } = req;
  const updatedData = req.body;

  try {
    //Find the user by the userId
    const user = await User.findById(userId);

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
    //update user profile with new data
    user.username = updatedData.username || user.username;
    user.email = updatedData.email || user.email;
    user.firstName = updatedData.firstName || user.firstName;
    user.lastName = updatedData.lastName || user.lastName;
    user.avatar = updatedData.avatar || user.avatar;
    user.bio = updatedData.bio || user.bio;

    await user.save();

    res.status(200).json({ message: "Profile update successful", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
};

export default updateUserProfile;
