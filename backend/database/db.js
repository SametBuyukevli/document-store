const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true, // SSL'de sertifika kontrolü yapmamak için
            },
        },
    }
);

const User = sequelize.define(
    "User",
    {
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Users",
        timestamps: false,
    }
);

const Document = sequelize.define(
    "Document",
    {
        DocumentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Explanation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        UploadDate: {
            type: DataTypes.STRING, // Güncellenmiş tür
            allowNull: false,
        },
        FileType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        FileSize: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        FileURL: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        UploaderID: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "UserID",
            },
        },
        DateModified: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Documents",
        timestamps: false,
    }
);

const Tag = sequelize.define(
    "Tag",
    {
        TagID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        TagName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Tags",
        timestamps: false,
    }
);

const DocumentTag = sequelize.define(
    "DocumentTag",
    {
        DocumentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Document,
                key: "DocumentID",
            },
        },
        TagID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Tag,
                key: "TagID",
            },
        },
    },
    {
        tableName: "DocumentTags",
        timestamps: false,
    }
);

const Category = sequelize.define(
    "Category",
    {
        CategoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CategoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Categories",
        timestamps: false,
    }
);

const DocumentCategory = sequelize.define(
    "DocumentCategory",
    {
        DocumentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Document,
                key: "DocumentID",
            },
        },
        CategoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Category,
                key: "CategoryID",
            },
        },
    },
    {
        tableName: "DocumentCategories",
        timestamps: false,
    }
);

User.hasMany(Document, { foreignKey: "UploaderID" });
Document.belongsTo(User, { foreignKey: "UploaderID" });

Document.belongsToMany(Tag, { through: DocumentTag, foreignKey: "DocumentID" });
Tag.belongsToMany(Document, { through: DocumentTag, foreignKey: "TagID" });

Document.belongsToMany(Category, {
    through: DocumentCategory,
    foreignKey: "DocumentID",
});
Category.belongsToMany(Document, {
    through: DocumentCategory,
    foreignKey: "CategoryID",
});

DocumentCategory.belongsTo(Category, { foreignKey: "CategoryID" });
Category.hasMany(DocumentCategory, { foreignKey: "CategoryID" });

module.exports = {
    sequelize,
    User,
    Document,
    Tag,
    DocumentTag,
    Category,
    DocumentCategory,
};
