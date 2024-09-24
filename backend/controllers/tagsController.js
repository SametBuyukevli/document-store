const { sequelize } = require("../database/db"); // Sequelize instance'ı import ediliyor

const getDocumentTags = async (req, res) => {
    try {
        const documentId = parseInt(req.params.id, 10);

        if (isNaN(documentId)) {
            return res.status(400).send({ message: "Invalid document ID" });
        }
        console.log(`Fetching tags for document ID: ${req.params.id}`);

        const tags = await sequelize.query(
            `SELECT TagName
             FROM DocumentTagView
             WHERE DocumentID = :documentId`,
            {
                replacements: { documentId },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (tags.length === 0) {
            return res
                .status(404)
                .json({ message: "No tags found for this document" });
        }

        res.json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getDocumentTags };
