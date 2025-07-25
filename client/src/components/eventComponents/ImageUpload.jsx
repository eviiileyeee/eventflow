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



const ImageUpload = ({ onChange, currentImage = null, onRemove, darkMode, ...props }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const file = currentImage;

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
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile) && onChange) {
      onChange(droppedFile);
    }
  }, [onChange]);

  const handleFileInput = (e) => {
    setError('');
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile) && onChange) {
      onChange(selectedFile);
    }
  };

  const removeFile = () => {
    if (onRemove) {
      onRemove();
    } else if (onChange) {
      onChange(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" {...props}>
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
            ${file ? 'pb-4' : 'pb-8'}
          `}
        >
          <input
            type="file"
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

          {file && (
            <div className="mt-4 flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <span className="text-sm text-gray-700">{file.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;