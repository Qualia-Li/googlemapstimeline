"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload, FileUp, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onFileLoaded: (data: any) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFileLoaded, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    if (!file) return;

    // Check if the file is a JSON file
    if (!file.name.endsWith('.json')) {
      onError("Please upload a JSON file");
      return;
    }

    setIsLoading(true);
    setFileName(file.name);
    
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (event.target?.result) {
            const jsonData = JSON.parse(event.target.result as string);
            
            // Check if the file contains the expected Google location history format
            if (!Array.isArray(jsonData)) {
              throw new Error("Invalid location history format");
            }
            
            if (jsonData.length > 0 && (!jsonData[0].startTime || (!jsonData[0].visit && !jsonData[0].activity))) {
              throw new Error("This doesn't appear to be a Google Maps Timeline (Location History) file");
            }
            
            onFileLoaded(jsonData);
            setUploadSuccess(true);
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Error parsing JSON:", err);
          onError(err instanceof Error ? err.message : "Failed to parse file");
          setFileName(null);
          setUploadSuccess(false);
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        onError("Error reading the file");
        setFileName(null);
        setUploadSuccess(false);
        setIsLoading(false);
      };
      
      reader.readAsText(file);
    } catch (err) {
      console.error("Error processing file:", err);
      onError(err instanceof Error ? err.message : "Failed to process file");
      setFileName(null);
      setUploadSuccess(false);
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        } ${uploadSuccess ? "bg-green-50 border-green-300" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          ref={fileInputRef}
          accept=".json"
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-2 border-primary border-t-transparent rounded-full mb-3"></div>
            <p className="text-lg">Processing your file...</p>
          </div>
        ) : uploadSuccess ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-14 w-14 text-green-500 mb-3" />
            <p className="text-lg font-medium text-green-700 mb-1">File uploaded successfully!</p>
            <p className="text-sm text-gray-600 mb-4">{fileName}</p>
            <Button onClick={handleButtonClick} variant="outline" size="sm">
              Upload a different file
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FileUp className="h-14 w-14 text-gray-400 mb-3" />
            <p className="text-lg font-medium mb-1">Upload your Location History file</p>
            <p className="text-sm text-gray-600 mb-4">
              Drag and drop your Google Maps Timeline (Location History) JSON file here, or click to select
            </p>
            <Button onClick={handleButtonClick} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Select File
            </Button>
            <div className="mt-4 text-xs text-gray-500">
                <a href='/blog/export-google-timeline-data' className="font-semibold text-blue-500">Step by step guide to export your Google Maps Timeline data</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 