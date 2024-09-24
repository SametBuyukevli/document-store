const path = require("path");
const moment = require("moment");
const { Document, DocumentTag, createTags, Tag } = require("../database/db");

// Create document and file upload
const createDocument = async (req, res) => {
    const { Title, Explanation, UploaderID, FileSize, Tags } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }

    const FileURL = file.path;
    const UploadDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const DateModified = moment().format("YYYY-MM-DD HH:mm:ss");

    try {
        // Document oluşturma
        const document = await Document.create({
            Title,
            Explanation,
            UploadDate,
            FileType: path
                .extname(file.originalname)
                .substring(1)
                .toUpperCase(),
            FileSize,
            UploaderID,
            FileURL,
            DateModified,
        });

        console.log("Document created:", document);

        // Tags işlemleri
        const tagsArray = Tags.split(",").map((tag) => tag.trim());
        const tagIds = [];

        for (const tagName of tagsArray) {
            const [tag, created] = await Tag.findOrCreate({
                where: { TagName: tagName },
            });
            tagIds.push(tag.TagID);
            console.log(`Tag ${created ? "created" : "found"}:`, tag); // Yeni mi bulundu yoksa önceden var mıydı?
        }

        // DocumentTags tablosuna ilişki ekleme
        for (const tagId of tagIds) {
            await DocumentTag.create({
                DocumentID: document.DocumentID,
                TagID: tagId,
            });
            console.log("DocumentTags entry created:", {
                DocumentID: document.DocumentID,
                TagID: tagId,
            });
        }

        return res.status(200).json({
            message: "Document created successfully",
            document,
            tags: tagsArray,
        });
    } catch (error) {
        console.error("Error creating document:", error.message);
        return res.status(500).json({ message: "Error creating document" });
    }
};

const getDocuments = async (req, res) => {
    // Bu kısımı daha sonra detaylandır
    try {
        const documents = await Document.findAll();
        if (!documents) {
            return res.status(404).send({ message: "No documents found" });
        } else {
            return res.status(200).send(documents);
        }
    } catch (error) {
        console.log("Get documents error:", error);
        res.sendStatus(500);
    }
};

const getDocument = async (req, res) => {
    const documentId = parseInt(req.params.id, 10);

    if (isNaN(documentId)) {
        return res.status(400).send({ message: "Invalid document ID" });
    }

    try {
        const document = await Document.findOne({
            where: {
                DocumentID: documentId,
            },
        });

        if (!document) {
            return res.status(404).send({ message: "Document not found" });
        }

        return res.status(200).send(document);
    } catch (error) {
        console.log("Get document error:", error);
        res.sendStatus(500);
    }
};

const updateDocument = async (req, res) => {
    const documentId = parseInt(req.params.id, 10);
    const { Title, Content, FileType, FileSize, UploaderID, FileURL } =
        req.body;

    if (isNaN(documentId)) {
        return res.status(400).send({ message: "Invalid document ID" });
    }

    try {
        const document = await Document.findOne({
            where: {
                DocumentID: documentId,
            },
        });

        if (!document) {
            return res.status(404).send({ message: "Document not found" });
        }

        document.Title = Title;
        document.Content = Content;
        document.FileType = FileType;
        document.FileSize = FileSize;
        document.UploaderID = UploaderID;
        document.FileURL = FileURL;

        await document.save();

        return res
            .status(200)
            .send({ message: "Document updated successfully", document });
    } catch (error) {
        console.log("Update document error:", error);
        res.sendStatus(500);
    }
};

const deleteDocument = async (req, res) => {
    const documentId = parseInt(req.params.id, 10);

    if (isNaN(documentId)) {
        return res.status(400).send({ message: "Invalid document ID" });
    }

    try {
        // 1. Silinen belgeye ait ilişkili DocumentTag kayıtlarını silin
        await DocumentTag.destroy({
            where: {
                DocumentID: documentId,
            },
        });

        // 2. Silinen belgeyi bulun ve silin
        const document = await Document.findOne({
            where: {
                DocumentID: documentId,
            },
        });

        if (!document) {
            return res.status(404).send({ message: "Document not found" });
        }

        await document.destroy();

        return res.status(200).send({
            message: "Document and related tags deleted successfully",
        });
    } catch (error) {
        console.log("Delete document error:", error);
        res.sendStatus(500);
    }
};

module.exports = {
    createTags,
    createDocument,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
};
