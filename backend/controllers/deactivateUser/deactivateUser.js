import User from "../../models/User.js";

const deactivateUser = async (req, res) => {
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

    //if user status is active set it as inactive and add the current date in deleteAt

    if (user.status === "active") {
      (user.status = "inactive"), (user.deletedAt = new Date());
      await user.save();
    }

    res.status(200).json({ message: "User is deactivated", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to deactivate User", error: error.message });
  }
};

export default deactivateUser;
