import React from "react";

import { FaFolderOpen } from "react-icons/fa";

const DocumentCard = () => {
    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-cardColor1 via-cardColor2 to-cardColor3 p-6 w-full max-w-md rounded-2xl shadow-xl">
            <div className="flex items-center">
                <FaFolderOpen className="text-black text-4xl" />
                <div className="ml-4">
                    <h2 className="text-black font-bold text-lg">Documents</h2>
                    <p className="text-black text-sm">873 files</p>
                </div>
            </div>
            <div className="text-right">
                <h3 className="text-black font-bold text-lg">12 GB</h3>
                <div className="w-12 bg-gray-300 rounded-full h-1 mt-1">
                    <div
                        className="bg-green-600 h-1 rounded-full"
                        style={{ width: "34%" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default DocumentCard;
