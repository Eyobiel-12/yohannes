"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, File, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxFileSizeMB?: number
  acceptedFileTypes?: string
}

export function FileUploader({
  onFilesSelected,
  maxFiles = 5,
  maxFileSizeMB = 10,
  acceptedFileTypes = "image/*,.pdf,.doc,.docx",
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    setError(null)

    // Check if adding these files would exceed the max number of files
    if (selectedFiles.length + fileList.length > maxFiles) {
      setError(`U kunt maximaal ${maxFiles} bestanden uploaden.`)
      return
    }

    const newFiles: File[] = []
    let hasError = false

    // Check each file
    Array.from(fileList).forEach((file) => {
      // Check file size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setError(`Bestand "${file.name}" is te groot. Maximale bestandsgrootte is ${maxFileSizeMB}MB.`)
        hasError = true
        return
      }

      newFiles.push(file)
    })

    if (hasError) return

    const updatedFiles = [...selectedFiles, ...newFiles]
    setSelectedFiles(updatedFiles)
    onFilesSelected(updatedFiles)

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(updatedFiles)
    onFilesSelected(updatedFiles)
    setError(null)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept={acceptedFileTypes}
        />
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <p className="text-sm font-medium mb-1">Klik om bestanden te uploaden of sleep ze hierheen</p>
        <p className="text-xs text-gray-500">Ondersteunde bestandsformaten: afbeeldingen, PDF, Word</p>
        <p className="text-xs text-gray-500">
          Max. {maxFiles} bestanden, max. {maxFileSizeMB}MB per bestand
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Geselecteerde bestanden ({selectedFiles.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-gray-500" />
                  <div className="text-sm">
                    <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                    <p className="text-gray-500 text-xs">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Verwijderen</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
