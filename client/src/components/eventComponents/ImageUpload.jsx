import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';

const Card = ({ className = '', children, ...props }) => {
    return (
      <div
        className={`rounded-lg border bg-white shadow-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  const CardContent = ({ className = '', children, ...props }) => {
    return (
      <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
      </div>
    );
  };



const ImageUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload only JPG, PNG, or GIF files');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError('');
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);
    
    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleFileInput = (e) => {
    setError('');
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(validateFile);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 
            transition-colors duration-200 ease-in-out
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${files.length > 0 ? 'pb-4' : 'pb-8'}
          `}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer px-4 py-2"
          />
          
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Drop your images here
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              or click to select files
            </p>
            <p className="mt-2 text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700 truncate max-w-xs">
                      {file.name}
                    </span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;