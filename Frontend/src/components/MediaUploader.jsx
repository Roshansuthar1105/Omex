import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaFilePdf, FaFileImage, FaFileVideo, FaFileAlt, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

/**
 * Component for uploading media files (images, PDFs, videos, text)
 */
const MediaUploader = ({ onFileSelect }) => {
  const { isDark } = useTheme();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    
    if (!selectedFile) return;
    
    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }
    
    // Set the file
    setFile(selectedFile);
    
    // Create preview based on file type
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview({
          type: 'image',
          url: reader.result
        });
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === 'application/pdf') {
      setPreview({
        type: 'pdf',
        name: selectedFile.name
      });
    } else if (selectedFile.type.startsWith('video/')) {
      setPreview({
        type: 'video',
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name
      });
    } else if (selectedFile.type === 'text/plain' || 
               selectedFile.name.endsWith('.txt') || 
               selectedFile.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview({
          type: 'text',
          content: reader.result.substring(0, 500) + (reader.result.length > 500 ? '...' : '')
        });
      };
      reader.readAsText(selectedFile);
    } else {
      toast.error('Unsupported file type. Please upload an image, PDF, video, or text file.');
      return;
    }
    
    // Pass the file to parent component
    onFileSelect(selectedFile);
    toast.success('File uploaded successfully!');
  }, [onFileSelect]);

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'video/*': ['.mp4', '.webm', '.ogg'],
      'text/plain': ['.txt', '.md']
    },
    maxFiles: 1
  });

  // Remove the selected file
  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileSelect(null);
    
    // Revoke object URL to avoid memory leaks
    if (preview && preview.type === 'video' && preview.url) {
      URL.revokeObjectURL(preview.url);
    }
  };

  // Render file icon based on type
  const renderFileIcon = () => {
    if (!file) return <FaFileUpload size={40} />;
    
    switch (file.type.split('/')[0]) {
      case 'image':
        return <FaFileImage size={40} className="text-blue-500" />;
      case 'application':
        return <FaFilePdf size={40} className="text-red-500" />;
      case 'video':
        return <FaFileVideo size={40} className="text-purple-500" />;
      case 'text':
        return <FaFileAlt size={40} className="text-green-500" />;
      default:
        return <FaFileAlt size={40} className="text-gray-500" />;
    }
  };

  // Render preview based on file type
  const renderPreview = () => {
    if (!preview) return null;
    
    switch (preview.type) {
      case 'image':
        return (
          <div className="mt-4 relative">
            <img 
              src={preview.url} 
              alt="Preview" 
              className="max-h-64 max-w-full rounded-lg shadow-md" 
            />
          </div>
        );
      case 'pdf':
        return (
          <div className={`mt-4 p-4 rounded-lg flex items-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <FaFilePdf size={24} className="text-red-500 mr-2" />
            <span className="truncate">{preview.name}</span>
          </div>
        );
      case 'video':
        return (
          <div className="mt-4 relative">
            <video 
              src={preview.url} 
              controls 
              className="max-h-64 max-w-full rounded-lg shadow-md"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'text':
        return (
          <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-40">
              {preview.content}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? isDark ? 'border-blue-400 bg-gray-700' : 'border-blue-400 bg-blue-50' 
              : isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            {renderFileIcon()}
            <p className="mt-4 text-lg font-medium">
              {isDragActive 
                ? 'Drop the file here' 
                : 'Drag & drop a file here, or click to select'}
            </p>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Supports images, PDFs, videos, and text files (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className={`border rounded-lg p-4 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {renderFileIcon()}
              <div className="ml-3">
                <p className="font-medium truncate max-w-xs">{file.name}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button 
              onClick={removeFile}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
              aria-label="Remove file"
            >
              <FaTimes />
            </button>
          </div>
          {renderPreview()}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
