import HistoryLog from "../models/HistoryLog.model.js";

export const createHistoryLog=async({
    boardId,
    userId,
    action,
    entityType,
    entityId,
    details={}
})=>{
    await HistoryLog.create({
    board: boardId,
    user: userId,
    action,
    entityType,
    entityId,
    details
    })
}