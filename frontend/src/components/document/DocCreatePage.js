import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import SidebarActive from "../SidebarActive.js";
import { LuUpload } from "react-icons/lu";
import { MdOutlineFormatColorText } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { GrStorage } from "react-icons/gr";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa";

const DocCreatePage = () => {
    const [fileInfo, setFileInfo] = useState({
        name: "",
        dateTimeCode: "",
        size: "",
        type: "",
        previewUrl: "", // Önizleme için URL
    });
    const [tags, setTags] = useState("");
    const [explanation, setExplanation] = useState("");

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.name.split(".").pop(); // Dosya uzantısını almak için split kullanımı
            const previewUrl = URL.createObjectURL(file); // Blob URL oluşturma
            console.log("File URL:", previewUrl);

            setFileInfo({
                name: file.name,
                dateTimeCode: new Date().toLocaleString(),
                size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
                type: fileType.toUpperCase(), // Dosya uzantısını büyük harf olarak ayarlama
                previewUrl, // Oluşturulan blob URL'yi state'e ekle
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kullanıcı verisini sessionStorage'dan al
        const storedUser = sessionStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const userId = user ? user.UserID : null;

        console.log("User retrieved from sessionStorage:", user);
        console.log("User ID retrieved:", userId);

        if (!userId) {
            console.error("Uploader ID not found in session.");
            alert("You need to be logged in to upload documents.");
            navigate("/users/login");
            return;
        }

        // formData'yı oluşturun ve gerekli verileri ekleyin
        const formData = new FormData();
        formData.append("Title", fileInfo.name); // Dosya adı için Title kullanıyoruz
        formData.append("Explanation", explanation); // Explanation'ı state'ten alıyoruz
        formData.append("UploaderID", userId);
        formData.append("Tags", tags); // Tags bilgisini backende aktarmak için ekledik
        formData.append("FileSize", fileInfo.size);
        formData.append(
            "File",
            document.querySelector("#file-upload").files[0]
        ); // Seçilen dosyayı alıyoruz

        try {
            const response = await axios.post(
                "http://localhost:3000/document/create",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Document created successfully:", response.data);
            console.log("Uploader ID:", userId);
            // Başarılı bir şekilde belge oluşturulduktan sonra my documents sayfasına yönlendir
            navigate("/document/list");
        } catch (error) {
            console.error("Error occurred while uploading file:", error);
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-blue-300 to-blue-50 min-h-screen">
            <SidebarActive />
            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col">
                {/* Upload Document Section */}
                <div className="bg-white p-6 rounded-md shadow-md flex flex-col gap-4 flex-grow">
                    {/* Document Upload and Details */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Side*/}
                        <div className="flex flex-col gap-4">
                            <label
                                htmlFor="file-upload"
                                className="border-dotted border-2 border-gray-300 rounded-md p-12 flex items-center justify-center text-gray-500 cursor-pointer"
                            >
                                <LuUpload className="text-3xl mr-2 " />
                                <span className="text-2xl font-semibold">
                                    Upload Document
                                </span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                            {/* Input Fields */}
                            {[
                                {
                                    placeholder: "Name",
                                    value: fileInfo.name,
                                    icon: <MdOutlineFormatColorText />,
                                },
                                {
                                    placeholder: "Date Time Code",
                                    value: fileInfo.dateTimeCode,
                                    icon: <BsCalendar2Date />,
                                },
                                {
                                    placeholder: "Tags",
                                    value: tags,
                                    icon: <PiBookmarkSimpleFill />,
                                },
                                {
                                    placeholder: "Upload Date",
                                    value: fileInfo.dateTimeCode,
                                    icon: <BsCalendar2Date />,
                                },
                                {
                                    placeholder: "Document Size",
                                    value: fileInfo.size,
                                    icon: <GrStorage />,
                                },
                                {
                                    placeholder: "Document Type",
                                    value: fileInfo.type,
                                    icon: <FaRegFilePdf />,
                                },
                            ].map((item, index) => (
                                <div key={index} className="relative">
                                    <input
                                        type="text"
                                        placeholder={item.placeholder}
                                        value={item.value}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        readOnly={item.placeholder !== "Tags"}
                                        onChange={(e) =>
                                            item.placeholder === "Tags" &&
                                            setTags(e.target.value)
                                        }
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Right Side: Preview */}
                        <div className="border-dotted border-2 border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                            {fileInfo.previewUrl ? (
                                <iframe
                                    title="Document Preview"
                                    src={fileInfo.previewUrl}
                                    className="w-full h-full"
                                ></iframe>
                            ) : (
                                <span className="text-2xl">Preview</span>
                            )}
                        </div>
                    </div>
                    {/* Explanation */}
                    <div className="mt-4">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
                            placeholder="Explanation"
                            rows={4}
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        ></textarea>
                    </div>
                    {/* Add Document Button */}
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-300 text-gray-500 font-semibold px-4 py-3 rounded-full shadow hover:bg-loginButton transition"
                            onClick={handleSubmit}
                        >
                            Add Document
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocCreatePage;
