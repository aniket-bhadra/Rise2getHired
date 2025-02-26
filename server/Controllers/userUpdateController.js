import User from "../Models/userModel.js";

export const saveJob = async (req, res) => {
  const { userId, job } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { savedJobs: job } },
      { new: true }
    );
    res.json({ message: "Job saved", savedJobs: user.savedJobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveAffirmation = async (req, res) => {
  const { userId, affirmation } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { savedAffirmations: affirmation } },
      { new: true }
    );
    res.json({
      message: "Affirmation saved",
      savedAffirmations: user.savedAffirmations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLastBrowsedJob = async (req, res) => {
  const { userId, job, updateCount } = req.body;

  try {
    const updateQuery = {
      $set: { lastBrowsedJob: job },
    };

    if (updateCount) {
      updateQuery.$inc = { noOfJobsBrowsed: 1 };
    }

    const user = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });
    res.json({ message: "Last browsed job updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
