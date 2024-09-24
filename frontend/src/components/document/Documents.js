import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarActive from "../SidebarActive.js";
import {
    FaRegFilePdf,
    FaStar,
    FaInfoCircle,
    FaTrashAlt,
    FaTimes,
} from "react-icons/fa";
import { LuPenLine, LuSend, LuUpload } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";

const Documents = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [checkedDocuments, setCheckedDocuments] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [infoContent, setInfoContent] = useState({
        tags: [], // Varsayılan olarak boş dizi
        explanation: "",
    });
    const [activeDocIndex, setActiveDocIndex] = useState(null);
    const [user, setUser] = useState(null);

    // Doküman bilgilerini göstermek için fonksiyon
    const handleShowInfo = async (doc, index) => {
        const documentId = doc.DocumentID;
        setInfoContent({
            tags: [], // Varsayılan olarak boş dizi
            explanation: doc.Explanation || "",
        });
        setActiveDocIndex(index);
        setShowInfo(!showInfo);

        try {
            const response = await axios.get(
                `http://localhost:4343/tags/detail/${documentId}`
            );
            console.log("Tags response:", response.data); // Yanıtı kontrol edin
            setInfoContent((prevContent) => ({
                ...prevContent,
                tags: response.data || [], // Varsayılan olarak boş dizi
            }));
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    useEffect(() => {
        //tarayıcıda oturum boyunca kayıtlı kullanıcı varmı kontrol et
        const storedUser = sessionStorage.getItem("user");
        //kullanıcı varsa state'a set et
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Dokümanları çekmek için useEffect
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get("/document/list", {
                    headers: { "Cache-Control": "no-cache" },
                });
                setDocuments(response.data);
                setFilteredDocuments(response.data); // Başlangıçta tüm dokümanları filtrele
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };


        fetchDocuments();
    }, []); // Sadece component mount olduğunda çalışır

    // Arama girişine göre dokümanları filtreleme
    useEffect(() => {
        setFilteredDocuments(
            documents.filter((doc) =>
                doc.Title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, documents]);

    const handleCheckAll = () => {
        setSelectAll(!selectAll);
        setCheckedDocuments(
            !selectAll ? documents.map((_, index) => index) : []
        );
    };

    const handleCheckDocument = (index) => {
        setCheckedDocuments((prevChecked) =>
            prevChecked.includes(index)
                ? prevChecked.filter((i) => i !== index)
                : [...prevChecked, index]
        );
    };

    const handleDeleteDocument = async () => {
        if (checkedDocuments.length === 0) {
            console.error("No documents selected for deletion");
            return;
        }

        try {
            for (const index of checkedDocuments) {
                const documentId = documents[index].DocumentID;
                await axios.delete(`/document/delete/${documentId}`);
            }

            setDocuments((prevDocs) =>
                prevDocs.filter((_, index) => !checkedDocuments.includes(index))
            );
            setCheckedDocuments([]);
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-blue-300 to-blue-50 min-h-screen">
            <SidebarActive user={user} />
            <div className="flex-1 p-6 flex flex-col">
                <div className="bg-white p-6 rounded-md shadow-md flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Documents</h2>
                        <div className="flex items-center space-x-16 mr-10">
                            <div
                                className="flex items-center justify-center border-2 p-0.5 border-borderColor-100 rounded-md"
                                onClick={() =>
                                    (window.location.href = "/document/create")
                                }
                            >
                                <LuUpload className="h-7 w-7 text-textColor" />
                            </div>
                            <div className="flex items-center justify-center border-2 p-0.5 border-borderColor-100 rounded-md">
                                <LuSend className="h-7 w-7 text-textColor" />
                            </div>
                            <div className="flex items-center justify-center border-2 p-0.5 border-borderColor-100 rounded-md">
                                <LuPenLine className="h-7 w-7 text-textColor" />
                            </div>
                        </div>
                        <div className="relative flex items-center flex-grow max-w-xs border-2 p-0.5 border-borderColor-100 rounded-md">
                            <IoSearch className="h-7 w-7 text-textColor absolute left-2" />
                            <input
                                type="text"
                                placeholder="Search for a Document..."
                                className="flex-grow pl-12 p-0.5 border-none rounded-md outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tablo başlıkları */}
                    <div className="flex items-center border-b text-lg font-semibold p-1">
                        <input
                            type="checkbox"
                            className="h-5 w-5 mr-4"
                            checked={selectAll}
                            onChange={handleCheckAll}
                        />
                        <div
                            className="flex-none"
                            style={{ minWidth: "220px" }}
                        >
                            Name
                        </div>
                        <div
                            className="flex-none"
                            style={{ minWidth: "265px" }}
                        >
                            Date-Time Code
                        </div>
                        <div
                            className="flex-none"
                            style={{ minWidth: "262px" }}
                        >
                            Date Modified
                        </div>
                        <div
                            className="flex-none"
                            style={{ minWidth: "240px" }}
                        >
                            File Size
                        </div>
                        <div
                            className="flex-none items-center justify-center border-2 p-0.5 border-fbcolor rounded-md"
                            style={{ minWidth: "5px" }}
                        >
                            <FaTrashAlt
                                className="w-5 h-5 text-fbcolor cursor-pointer"
                                onClick={handleDeleteDocument}
                            />
                        </div>
                    </div>

                    {/* Doküman Listesi */}
                    <div className="overflow-y-auto flex-grow w-full bg-white border-t-2 h-64 border-borderColor-100">
                        {filteredDocuments.map((doc, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 border-b text-lg hover:bg-gray-300"
                            >
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 mr-4"
                                    checked={checkedDocuments.includes(index)}
                                    onChange={() => handleCheckDocument(index)}
                                />
                                <div className="flex-grow flex items-center">
                                    <FaRegFilePdf className="text-red-500 mr-2 w-8 h-8" />
                                    <a
                                        href={`http://localhost:8080/${doc.FileURL}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate w-24"
                                    >
                                        {doc.Title}
                                    </a>
                                </div>
                                <div className="flex-grow">
                                    {doc.UploadDate}
                                </div>
                                <div className="flex-grow">
                                    {doc.DateModified}
                                </div>
                                <div className="flex-grow">{doc.FileSize}</div>
                                <div className="flex items-center justify-center">
                                    <BsThreeDots
                                        className="w-5 h-5 text-gray-500 cursor-pointer"
                                        onClick={() =>
                                            handleShowInfo(doc, index)
                                        }
                                    />
                                    <PiBookmarkSimpleFill className="w-5 h-5 text-green-500 cursor-pointer ml-2" />
                                    <FaStar className="w-5 h-5 text-yellow-500 cursor-pointer ml-2" />
                                    <FaInfoCircle className="w-5 h-5 text-blue-500 cursor-pointer ml-2" />
                                </div>
                                {showInfo && activeDocIndex === index && (
                                    <div className="fixed inset-0 bg-gray-400 bg-opacity-5 backdrop-blur-sm flex items-center justify-center z-50">
                                        <div className="relative bg-white w-1/3 md:w-1/4 rounded-lg p-6">
                                            {/* Close button */}
                                            <button
                                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                                onClick={() =>
                                                    setShowInfo(false)
                                                }
                                            >
                                                <FaTimes className="w-5 h-5" />
                                            </button>

                                            <h3 className="text-xl text-center font-semibold mb-4">
                                                Document Information
                                            </h3>
                                            <h3 className="text-lg font-semibold mb-1">
                                                Tags:
                                            </h3>
                                            <div className="flex space-x-2 mb-6">
                                                {infoContent.tags &&
                                                infoContent.tags.length > 0 ? (
                                                    infoContent.tags.map(
                                                        (tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="bg-gray-100 rounded-md px-2 py-2 text-center text-lg"
                                                            >
                                                                {tag.TagName}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span>No Tags</span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-semibold mb-1">
                                                Explanation:
                                            </h3>
                                            <p className="mb-4">
                                                {infoContent.explanation}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
