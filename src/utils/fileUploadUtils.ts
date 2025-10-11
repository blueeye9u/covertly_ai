import { toast } from "react-hot-toast";
import { UploadedFile } from "../context/conversation.context";

export interface FileAnalysis {
    duplicateFiles: File[];
    newFiles: File[];
    replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>;
}

export interface PendingFileAnalysis {
    duplicateFiles: File[];
    actuallyNewFiles: File[];
    replacementFiles: File[];
}

/**
 * Analyzes files for duplicates against existing uploaded files
 * Used in useUploadFiles hook
 */
export const analyzeFilesForDuplicates = (
    selectedFiles: File[], 
    existingFiles: UploadedFile[]
): FileAnalysis => {
    const duplicateFiles: File[] = [];
    const newFiles: File[] = [];
    const replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}> = [];

    for (const file of selectedFiles) {
        const existingFileIndex = existingFiles.findIndex((existingFile: UploadedFile) =>
            existingFile.originalName === file.name || existingFile.name === file.name
        );
        
        if (existingFileIndex === -1) {
            newFiles.push(file);
        } else {
            duplicateFiles.push(file);
            replacementInfo.push({
                file,
                index: existingFileIndex,
                originalFile: existingFiles[existingFileIndex]
            });
        }
    }

    return { duplicateFiles, newFiles, replacementInfo };
};

/**
 * Analyzes files for duplicates against pending files
 * Used in UploadFilesModal
 */
export const analyzePendingFilesForDuplicates = (
    selectedFiles: File[],
    existingPendingFiles: File[]
): PendingFileAnalysis => {
    const duplicateFiles: File[] = [];
    const actuallyNewFiles: File[] = [];
    const replacementFiles: File[] = [];

    for (const file of selectedFiles) {
        const existingIndex = existingPendingFiles.findIndex((existingFile) => existingFile.name === file.name);
        if (existingIndex === -1) {
            actuallyNewFiles.push(file);
        } else {
            duplicateFiles.push(file);
            replacementFiles.push(file);
        }
    }

    return { duplicateFiles, actuallyNewFiles, replacementFiles };
};

/**
 * Validates file upload limits and shows appropriate error messages
 */
export const validateFileUploadLimits = (
    newFilesCount: number,
    existingFilesCount: number,
    duplicateFilesCount: number,
    maxFiles: number
): boolean => {
    const availableUploadCount = maxFiles - existingFilesCount;
    
    if (newFilesCount > availableUploadCount) {
        if(availableUploadCount == 0) {
            toast.error(`You can not upload up any more files.`);
        }
        else if (duplicateFilesCount > 0) {
            toast.error(`You can only upload up to ${availableUploadCount} new files. ${duplicateFilesCount} duplicate(s) will be replaced.`);
        } else {
            toast.error(`You can only upload up to ${availableUploadCount} more file(s).`);
        }
        return false;
    }
    
    return true;
};

/**
 * Shows success messages for file operations
 */
export const showFileUploadSuccessMessage = (
    duplicateCount: number,
    newCount: number,
    isModalContext: boolean = false
) => {
    const suffix = isModalContext ? " Save & Close to upload." : "";
    
    if (duplicateCount > 0 && newCount > 0) {
        if (isModalContext) {
            toast.success(`${newCount} new file(s) added, ${duplicateCount} file(s) will be replaced.${suffix}`);
        } else {
            toast.success(`${newCount} new file(s) uploaded and ${duplicateCount} file(s) replaced successfully.`);
        }
    } else if (duplicateCount > 0) {
        if (isModalContext) {
            toast.success(`${duplicateCount} file(s) will be replaced.${suffix}`);
        } else {
            toast.success(`${duplicateCount} file(s) replaced successfully.`);
        }
    } else if (isModalContext) {
        toast.success(`${newCount} file${newCount > 1 ? 's' : ''} added.${suffix}`);
    } else {
        toast.success("Files uploaded successfully.");
    }
};

/**
 * Shows confirmation message for file replacements
 */
export const showReplacementConfirmation = (duplicateFiles: File[]) => {
    if (duplicateFiles.length > 0) {
        const fileNames = duplicateFiles.map(f => f.name).join(", ");
        toast.success(`${duplicateFiles.length} file(s) will be replaced: ${fileNames}`);
    }
};

/**
 * Validates file sizes against maximum limit
 */
export const validateFileSizes = (files: File[], maxSizeBytes: number): boolean => {
    const oversizedFiles = files.filter((file) => file.size > maxSizeBytes);
    
    if (oversizedFiles.length > 0) {
        const maxSizeMB = maxSizeBytes / (1024 * 1024);
        toast.error(`File(s) ${oversizedFiles.map((f) => f.name).join(", ")} exceed the ${maxSizeMB}MB limit.`);
        return false;
    }
    
    return true;
};

/**
 * Replaces duplicate files in an array with new files
 */
export const replaceDuplicateFiles = <T extends { name: string }>(
    currentFiles: T[],
    duplicateFiles: File[]
): T[] => {
    const updatedFiles = [...currentFiles];
    
    for (const file of duplicateFiles) {
        const existingIndex = updatedFiles.findIndex((existingFile) => existingFile.name === file.name);
        if (existingIndex !== -1) {
            updatedFiles[existingIndex] = file as unknown as T;
        }
    }
    
    return updatedFiles;
};

/**
 * Upload configuration constants
 */
export const MAX_UPLOAD_FILES = 3;
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

/**
 * Supported file types for uploads
 */
export const SUPPORTED_FILE_TYPES = ["png", "jpg", "jpeg", "pdf", "mp3", "wav"];

/**
 * Upload tab indices for different file types
 */
export enum FileTypeTab {
    IMAGE = 0,
    PDF = 1,
    AUDIO = 2
}

/**
 * Validates if files are all of the same type
 */
export const validateSameFileType = (files: File[]): boolean => {
    if (files.length === 0) return true;
    
    const firstFileType = files[0].type.split('/')[0];
    const hasMultipleTypes = files.some(file => file.type.split('/')[0] !== firstFileType);
    
    if (hasMultipleTypes) {
        toast.error('Please upload files of the same type.');
        return false;
    }
    
    return true;
};

/**
 * Filters files to only include supported types
 */
export const filterSupportedFiles = (files: File[]): File[] => {
    return files.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
        const isPdf = file.type === 'application/pdf';
        const isImage = file.type.startsWith('image/');
        const isAudio = file.type.startsWith('audio/');
        
        if (isPdf && SUPPORTED_FILE_TYPES.includes('pdf')) return true;
        if ((isImage || isAudio) && SUPPORTED_FILE_TYPES.includes(ext)) return true;
        return false;
    });
};

/**
 * Determines the appropriate tab index based on file type
 */
export const getFileTypeTabIndex = (file: File): FileTypeTab => {
    const fileType = file.type;
    
    if (fileType.startsWith('image/')) {
        return FileTypeTab.IMAGE;
    } else if (fileType === 'application/pdf') {
        return FileTypeTab.PDF;
    } else if (fileType.startsWith('audio/')) {
        return FileTypeTab.AUDIO;
    }
    
    return FileTypeTab.PDF; // Default fallback
};

/**
 * Validates if new files have the same type as existing files
 */
export const validateFileTypeConsistency = (newFiles: File[], existingFiles: UploadedFile[]): boolean => {
    if (existingFiles.length === 0) return true;
    
    // Get the file type category from existing files
    const existingFileType = existingFiles[0].type;
    let existingCategory: string;
    
    if (existingFileType?.startsWith('image/')) {
        existingCategory = 'image';
    } else if (existingFileType === 'application/pdf') {
        existingCategory = 'pdf';
    } else if (existingFileType?.startsWith('audio/')) {
        existingCategory = 'audio';
    } else {
        existingCategory = 'unknown';
    }
    
    // Check if new files match the existing category
    const hasInconsistentType = newFiles.some(file => {
        let newCategory: string;
        
        if (file.type.startsWith('image/')) {
            newCategory = 'image';
        } else if (file.type === 'application/pdf') {
            newCategory = 'pdf';
        } else if (file.type.startsWith('audio/')) {
            newCategory = 'audio';
        } else {
            newCategory = 'unknown';
        }
        
        return newCategory !== existingCategory;
    });
    
    if (hasInconsistentType) {
        const categoryName = existingCategory.charAt(0).toUpperCase() + existingCategory.slice(1);
        toast.error(`All files must be of the same type. Existing files are ${categoryName} files.`);
        return false;
    }
    
    return true;
};

/**
 * Validates and processes files for upload
 * Returns processed files and appropriate tab index, or null if validation fails
 */
export const validateAndProcessFiles = (files: File[]): { processedFiles: File[], tabIndex: FileTypeTab } | null => {
    if (files.length === 0) {
        return null;
    }
    
    // Filter to only supported file types
    const supportedFiles = filterSupportedFiles(files);
    
    if (supportedFiles.length === 0) {
        toast.error('Unsupported file type.');
        return null;
    }
    
    // Check if all files are of the same type
    if (!validateSameFileType(supportedFiles)) {
        return null;
    }
    
    // Get appropriate tab index
    const tabIndex = getFileTypeTabIndex(supportedFiles[0]);
    
    return {
        processedFiles: supportedFiles,
        tabIndex
    };
};