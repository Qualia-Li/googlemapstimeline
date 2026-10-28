"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, CheckCircle } from "lucide-react";
import { normalizeTimelineExport } from "@/lib/utils";
import { EN_UI, type UiStrings } from "@/lib/i18n";

interface FileUploadProps {
  onFileLoaded: (data: any) => void;
  onError: (error: string) => void;
  t?: UiStrings;
}

export function FileUpload({ onFileLoaded, onError, t = EN_UI }: FileUploadProps) {
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
      onError(t.errJsonOnly);
      return;
    }

    setIsLoading(true);
    setFileName(file.name);
    
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (event.target?.result) {
            const jsonData = normalizeTimelineExport(JSON.parse(event.target.result as string));

            // iPhone location-history.json or Android Timeline.json; anything else is rejected
            if (!jsonData) {
              throw new Error(t.errNotTimeline);
            }

            onFileLoaded(jsonData);
            setUploadSuccess(true);
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Error parsing JSON:", err);
          onError(err instanceof SyntaxError ? t.errParse : err instanceof Error ? err.message : t.errParse);
          setFileName(null);
          setUploadSuccess(false);
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        onError(t.errRead);
        setFileName(null);
        setUploadSuccess(false);
        setIsLoading(false);
      };
      
      reader.readAsText(file);
    } catch (err) {
      console.error("Error processing file:", err);
      onError(err instanceof Error ? err.message : t.errParse);
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
        <label htmlFor="location-history-upload" className="sr-only">
          {t.uploadAria}
        </label>
        <input
          id="location-history-upload"
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          ref={fileInputRef}
          accept=".json"
          aria-label={t.uploadAria}
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-2 border-primary border-t-transparent rounded-full mb-3"></div>
            <p className="text-lg">{t.processing}</p>
          </div>
        ) : uploadSuccess ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-14 w-14 text-green-500 mb-3" />
            <p className="text-lg font-medium text-green-700 mb-1">{t.uploadSuccess}</p>
            <p className="text-sm text-gray-600 mb-4">{fileName}</p>
            <Button onClick={handleButtonClick} variant="outline" size="sm">
              {t.uploadAnother}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FileUp className="h-14 w-14 text-gray-400 mb-3" />
            <p className="text-lg font-medium mb-1">{t.uploadPrompt}</p>
            <p className="text-sm text-gray-600 mb-4">
              {t.uploadHint}
            </p>
            <Button onClick={handleButtonClick} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {t.selectFile}
            </Button>
            <div className="mt-4 text-xs text-gray-500">
                <a href={t.guideHref} className="font-semibold text-blue-500">{t.guideLink}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 