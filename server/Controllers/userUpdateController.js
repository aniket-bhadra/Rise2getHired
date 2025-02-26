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

export const isJobSaved = async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const jobExists = user.savedJobs.some((job) => job.job_id === jobId);
    res.json({ isSaved: jobExists });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
