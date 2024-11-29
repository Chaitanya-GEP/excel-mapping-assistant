export async function analyzeExcelFile(file: File): Promise<MappingResponse> {
  // TODO: Replace with actual API endpoint
  // Simulated API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sessionId: 'test-session',
        records: [
          { excelColumn: 'First Name', modelProperty: 'firstName', confidence: 0.95 },
          { excelColumn: 'Last Name', modelProperty: 'lastName', confidence: 0.92 },
          { excelColumn: 'Email Address', modelProperty: 'email', confidence: 0.98 },
        ],
      });
    }, 1500);
  });
}

export async function approveMapping(sessionId: string): Promise<boolean> {
  // TODO: Replace with actual API endpoint
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
}