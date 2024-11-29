export interface ColumnMapping {
  excelColumn: string;
  modelProperty: string;
  confidence: number;
}

export interface MappingResponse {
  records: ColumnMapping[];
  sessionId: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string | MappingResponse;
  files?: File[];
}

export interface MessageInputProps {
  onSend: (message: string, files: File[]) => void;
  isProcessing: boolean;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}