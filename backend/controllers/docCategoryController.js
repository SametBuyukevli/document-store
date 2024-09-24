const { DocumentCategory, Category } = require("../database/db");

const createDocCategory = async (req, res) => {
    const { documentId, categoryId } = req.params;

    if (isNaN(documentId) || isNaN(categoryId)) {
        return res
            .status(400)
            .send({ message: "Invalid document or category ID" });
    }

    try {
        const docCategory = await DocumentCategory.create({
            DocumentID: documentId,
            CategoryID: categoryId,
        });

        res.status(200).send({
            message: "Document category created successfully",
            docCategory,
        });
    } catch (error) {
        console.log("Document category create error:", error);
        res.sendStatus(500);
    }
};

// Dokümanın kategorilerini getir
const getDocCategories = async (req, res) => {
    const documentId = parseInt(req.params.documentId, 10);

    if (isNaN(documentId)) {
        return res.status(400).send({ message: "Invalid document ID" });
    }

    try {
        const docCategories = await DocumentCategory.findAll({
            where: { DocumentID: documentId },
            include: [
                {
                    model: Category,
                    attributes: ["CategoryName"],
                },
            ],
        });
        // sorgu ile veritabnından dönen sonucu düzenle
        const result = docCategories.map((dc) => ({
            DocumentID: dc.DocumentID,
            CategoryID: dc.CategoryID,
            CategoryName: dc.Category.CategoryName,
        }));

        res.status(200).send(result);
    } catch (error) {
        console.log("Document category get error:", error);
        res.sendStatus(500);
    }
};

// Document Category silme
const deleteDocCategory = async (req, res) => {
    const { documentId, categoryId } = req.params;

    if (isNaN(documentId) || isNaN(categoryId)) {
        return res
            .status(400)
            .send({ message: "Invalid document or category ID" });
    }

    try {
        const docCategory = await DocumentCategory.findOne({
            where: {
                DocumentID: documentId,
                CategoryID: categoryId,
            },
        });

        if (!docCategory) {
            return res
                .status(404)
                .send({ message: "Document category not found" });
        }

        await docCategory.destroy();
        res.status(200).send({
            message: "Document category deleted successfully",
        });
    } catch (error) {
        console.log("Document category delete error:", error);
        res.sendStatus(500);
    }
};

// Document Category güncelleme
// Bu kısımı frontend kısmını yaptıktan sonra tekrar bak
// const updateDocCategory = async (req, res) => {
//   const { documentId, categoryId } = req.params;

//   if (isNaN(documentId) || isNaN(categoryId)) {
//     return res.status(400).send({ message: "Invalid document or category ID" });
//   }

//   try {
//     const docCategory = await DocumentCategory.findOne({
//       where:{
//         DocumentID: documentId,
//         CategoryID: categoryId
//       }
//     });

//     if (!docCategory) {
//       return res.status(404).send({ message: "Document category not found" });
//     }

//     await docCategory.update(req.body);

//     res.status(200).send({ message: "Document category updated successfully", docCategory });

//   } catch (error) {
//     console.log('Document category update error:', error);
//     res.sendStatus(500);

//   }
// };

module.exports = { createDocCategory, getDocCategories, deleteDocCategory };
