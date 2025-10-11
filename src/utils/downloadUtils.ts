export const downloadFile = (url: string, filename: string, cleanup: boolean = true): void => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  
  if (cleanup) {
    URL.revokeObjectURL(url);
  }
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename, true);
};
