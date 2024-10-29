import COUNTRY_LIST from "../data/countries.js";

// Get countries list
export const getCountries = async (req, res) => {
    try {
        const { id } = req.query;

        // If an ID is provided, return the specific country
        if (id) {
            const country = COUNTRY_LIST.find(c => c.id === +id); // Find by ID
            if (!country) return res.status(404).json({ message: "Country not found" });
            return res.status(200).json(country);
        }

        // If no ID is provided, return the full list of countries
        res.status(200).json(COUNTRY_LIST);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}