import STATE_LIST from "../data/states.js";

// Get countries list
export const getStates = async (req, res) => {
    try {
        const { id } = req.query;

        // If an ID is provided, return the specific country
        if (id) {
            const state = STATE_LIST.find(state => state.id === +id);
            if (!state) return res.status(404).json({ message: "State not found" });
            return res.status(200).json(state);
        }

        // If no ID is provided, return the full list of countries
        res.status(200).json(STATE_LIST);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}