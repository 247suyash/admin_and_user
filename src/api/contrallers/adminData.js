import { PaginatedData } from "../middleware/pagination.js";

const data = async (req, res) => {
    try {
        const adminUser = await PaginatedData(req)
        return res.status(200).json({
            data: adminUser,
        });
    } catch (error) {
        res.status(401).json({
            message: message.DATA_NOT_FOUND
        });
    }
}
export default data