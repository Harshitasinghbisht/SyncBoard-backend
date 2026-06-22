import HistoryLog from "../models/HistoryLog.model.js";

const getBoardActivities = async (req, res) => {
  try {
    const activities = await HistoryLog.find({
      board: req.params.boardId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getBoardActivities