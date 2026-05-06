import "../../styles/dashboard/documents.css";
import {
  Search,
  Upload,
  FileText,
  Pencil,
  Download,
  Share2,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../../components/common/ConfirmModal";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [docType, setDocType] = useState("notes");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [rsDocLoading, setRsDocLoading] = useState(true);

  // FETCH
  const fetchDocs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/documents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDocs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      setDocs([]);
    } finally {
      setRsDocLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // UPLOAD
  const handleUpload = async () => {
    if (!file) return alert("Select file first");

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", docType);

    try {
      setUploading(true);
      setUploadProgress(0);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/documents/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });

      await fetchDocs();
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/documents/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      fetchDocs();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // RENAME
  const handleRename = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/documents/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setRenamingId(null);
      setNewName("");
      fetchDocs();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleShare = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/documents/share/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const link = res.data.shareLink;
      const expires = new Date(res.data.expiresAt).toLocaleString();

      navigator.clipboard.writeText(link);

      alert(`Link copied!\nExpires at: ${expires}`);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // 🔐 SECURE DOWNLOAD
  const downloadFile = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/documents/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // FILTER
  const filteredDocs = docs.filter((doc) => {
    return (
      (filter === "all" || doc.type === filter) &&
      doc.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalFiles = docs.length;
  const sharedFiles = docs.filter((d) => d.shared).length;

  return (
    <div className="rs-documents-page">
      {/* HEADER */}
      <div className="rs-doc-header">
        <h1>
          Document <span>Center</span>
        </h1>
        <p>
          Your academic repository. Manage your certificates, transcripts, and
          study notes in one beautifully organized space.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="rs-doc-controls">
        {/* LEFT SIDE */}
        <div className="rs-doc-left">
          <div className="rs-search-box">
            <Search size={16} />
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="rs-doc-actions">
            <button
              onClick={() => setFilter("all")}
              className={`rs-filter ${filter === "all" ? "active" : ""}`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("certificate")}
              className={`rs-filter ${filter === "certificate" ? "active" : ""}`}
            >
              Certificates
            </button>

            <button
              onClick={() => setFilter("transcript")}
              className={`rs-filter ${filter === "transcript" ? "active" : ""}`}
            >
              Transcripts
            </button>

            <button
              onClick={() => setFilter("notes")}
              className={`rs-filter ${filter === "notes" ? "active" : ""}`}
            >
              Notes
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rs-doc-right">
          <select
            className="rs-type-select"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            <option value="notes">Notes</option>
            <option value="certificate">Certificate</option>
            <option value="transcript">Transcript</option>
          </select>

          <label className="rs-file-label">
            Choose File
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>

          {file && <span className="rs-file-name">{file.name}</span>}

          <button
            className="rs-upload-btn"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {uploading && (
        <div className="rs-upload-progress">
          <div
            className="rs-progress-bar"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <span>{uploadProgress}%</span>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="rs-doc-main">
        {rsDocLoading ? (
          <>
            <div className="rs-doc-skeleton-card"></div>
            <div className="rs-doc-skeleton-card"></div>
          </>
        ) : (
          <>
            {/* LEFT */}
            <div className="rs-doc-highlight">
              <div className="rs-doc-badge">MOST RECENT</div>

              {docs[0] ? (
                <>
                  <h2>{docs[0].name}</h2>
                  <p>Added on {new Date(docs[0].createdAt).toDateString()}</p>

                  <div className="rs-doc-buttons">
                    <button
                      className="rs-doc-primary-btn"
                      onClick={() => downloadFile(docs[0]._id)}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <p>No recent document</p>
              )}
            </div>

            {/* RIGHT */}
            <div className="rs-storage-card">
              <h3>STORAGE SUMMARY</h3>

              <div className="rs-storage-bar">
                <div
                  className="rs-storage-fill"
                  style={{ width: `${totalFiles * 10}%` }}
                ></div>
              </div>

              <div className="rs-storage-stats">
                <div>
                  <h2>{totalFiles}</h2>
                  <p>Total Files</p>
                </div>
                <div>
                  <h2>{sharedFiles}</h2>
                  <p>Shared</p>
                </div>
              </div>

              <button className="rs-clean-btn">Clean Storage</button>
            </div>
          </>
        )}
      </div>

      {/* RECENTS */}
      <div className="rs-recent">
        <h3>Recent Documents</h3>

        {rsDocLoading ? (
          <>
            <div className="rs-doc-skeleton-line"></div>
            <div className="rs-doc-skeleton-line"></div>
            <div className="rs-doc-skeleton-line"></div>
          </>
        ) : (
          <>
            {filteredDocs.length === 0 && (
              <p className="rs-empty-msg">No documents found</p>
            )}

            {filteredDocs.map((doc) => (
              <div className="rs-file-item" key={doc._id}>
                {doc.fileUrl.match(/\.(jpg|jpeg|png)$/) ? (
                  <img src={doc.fileUrl} className="rs-file-preview" />
                ) : (
                  <FileText size={18} />
                )}

                <div>
                  {renamingId === doc._id ? (
                    <input
                      className="rs-rename-input"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(doc._id);
                      }}
                    />
                  ) : (
                    <>
                      <h4>{doc.name}</h4>
                      <p>
                        {new Date(doc.createdAt).toDateString()} •{" "}
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  )}
                </div>

                <div className="rs-file-right">
                  <button
                    className="rs-doc-download-btn"
                    onClick={() => downloadFile(doc._id)}
                  >
                    <Download size={18} />
                  </button>

                  <button
                    className="rs-doc-share-btn"
                    onClick={() => handleShare(doc._id)}
                  >
                    <Share2 size={16} />
                  </button>

                  <button
                    className="rs-rename-btn"
                    onClick={() => {
                      setRenamingId(doc._id);
                      setNewName(doc.name);
                    }}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="rs-delete-btn"
                    onClick={() => setDeleteId(doc._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          handleDelete(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
