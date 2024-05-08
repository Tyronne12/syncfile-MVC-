import React, { useState } from "react";
import { Link } from 'react-router-dom';
import PDF from "../Assets/Images/pdf.png";
import Excel from "../Assets/Images/excel.png";
import Docs from "../Assets/Images/docs2.png";
import PPT from "../Assets/Images/ppt.png";
import TXT from "../Assets/Images/text.png";
import IMG from "../Assets/Images/images.png";
import Others from "../Assets/Images/others.png";
import All from "../Assets/Images/all2.png";

function AccessHeader(){

    const [selectedFileType, setSelectedFileType] = useState('all'); // Default selected file type

    const handleFileTypeChange = (fileType) => {
        setSelectedFileType(fileType);
    };

    console.log(selectedFileType);

    return (
        <div className="file-type-tabs">
            <label className="tabs" onClick={() => handleFileTypeChange('all')}>
                <input
                    type="radio"
                    name="fileType"
                    value="all"
                    checked={selectedFileType === 'all'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={All}/></div>
                <p className="access-tab-name">All Files</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('word')}>
                <input
                    type="radio"
                    name="fileType"
                    value="word"
                    checked={selectedFileType === 'word'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={Docs}/></div>
                <p className="access-tab-name">.docs</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('spreadsheet')}>
                <input
                    type="radio"
                    name="fileType"
                    value="spreadsheet"
                    checked={selectedFileType === 'spreadsheet'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={Excel}/></div>
                <p className="access-tab-name">.xlx</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('pdf')}>
                <input
                    type="radio"
                    name="fileType"
                    value="pdf"
                    checked={selectedFileType === 'pdf'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={PDF}/></div>
                <p className="access-tab-name">.pdf</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('powerpoint')}>
                <input
                    type="radio"
                    name="fileType"
                    value="powerpoint"
                    checked={selectedFileType === 'powerpoint'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={PPT}/></div>
                <p className="access-tab-name">.ppt</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('text')}>
                <input
                    type="radio"
                    name="fileType"
                    value="text"
                    checked={selectedFileType === 'text'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={TXT}/></div>
                <p className="access-tab-name">.txt</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('image')}>
                <input
                    type="radio"
                    name="fileType"
                    value="image"
                    checked={selectedFileType === 'image'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={IMG}/></div>
                <p className="access-tab-name">img</p>
            </label>
            <label className="tabs" onClick={() => handleFileTypeChange('others')}>
                <input
                    type="radio"
                    name="fileType"
                    value="others"
                    checked={selectedFileType === 'others'}
                    onChange={() => {}}
                />
                <div className="access-icon-container"><img src={Others}/></div>
                <p className="access-tab-name">others</p>
            </label>
        </div>
    )
}

export default AccessHeader;
