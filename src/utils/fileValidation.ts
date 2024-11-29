import { FileValidationResult } from '../types/mapping';

const ALLOWED_MIME_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

const ALLOWED_EXTENSIONS = ['.xlsx', '.xls', '.csv'];

export function validateFile(file: File): FileValidationResult {
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error: 'Only Excel (.xlsx, .xls) and CSV files are supported'
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type) && file.type !== '') {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload Excel or CSV files only'
    };
  }

  return { isValid: true };
}