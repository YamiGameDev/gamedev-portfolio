// src/components/assignments/AssignmentSubmission.jsx
import React, { useState } from 'react';

const AssignmentSubmission = ({ assignment, courseId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    comments: '',
    files: [],
    submissionType: 'file'
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...fileArray]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      assignmentTitle: assignment.title,
      courseId,
      ...formData,
      submittedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold" style={{color: '#222831'}}>
              Submit Assignment: {assignment.title}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-sm mt-2" style={{color: '#666'}}>
            Due: {assignment.due}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Submission Type */}
          <div className="mb-6">
            <label className="block font-medium mb-3" style={{color: '#222831'}}>
              Submission Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="submissionType"
                  value="file"
                  checked={formData.submissionType === 'file'}
                  onChange={(e) => setFormData(prev => ({...prev, submissionType: e.target.value}))}
                  className="mr-2"
                />
                📁 File Upload
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="submissionType"
                  value="link"
                  checked={formData.submissionType === 'link'}
                  onChange={(e) => setFormData(prev => ({...prev, submissionType: e.target.value}))}
                  className="mr-2"
                />
                🔗 Link/URL
              </label>
            </div>
          </div>

          {/* File Upload Area */}
          {formData.submissionType === 'file' && (
            <div className="mb-6">
              <label className="block font-medium mb-3" style={{color: '#222831'}}>
                Upload Files
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mb-4">
                  <span className="text-4xl">📤</span>
                </div>
                <p className="mb-2" style={{color: '#222831'}}>
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm" style={{color: '#666'}}>
                  Supports: ZIP, PDF, DOC, PNG, JPG (Max 10MB each)
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                  accept=".zip,.pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block mt-4 px-4 py-2 rounded-lg cursor-pointer text-white"
                  style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                >
                  Choose Files
                </label>
              </div>

              {/* File List */}
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium" style={{color: '#222831'}}>Selected Files:</h4>
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="mr-2">📄</span>
                        <div>
                          <p className="font-medium" style={{color: '#222831'}}>{file.name}</p>
                          <p className="text-xs" style={{color: '#666'}}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Link Submission */}
          {formData.submissionType === 'link' && (
            <div className="mb-6">
              <label className="block font-medium mb-3" style={{color: '#222831'}}>
                Project Link/URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{borderColor: '#d1d5db'}}
                onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                value={formData.link || ''}
                onChange={(e) => setFormData(prev => ({...prev, link: e.target.value}))}
              />
            </div>
          )}

          {/* Comments */}
          <div className="mb-6">
            <label className="block font-medium mb-3" style={{color: '#222831'}}>
              Comments (Optional)
            </label>
            <textarea
              rows="4"
              placeholder="Add any notes about your submission..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
              style={{borderColor: '#d1d5db'}}
              onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({...prev, comments: e.target.value}))}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-lg font-medium text-white"
              style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
              disabled={formData.submissionType === 'file' ? formData.files.length === 0 : !formData.link}
            >
              Submit Assignment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 rounded-lg font-medium"
              style={{borderColor: '#d1d5db', color: '#666'}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmission;