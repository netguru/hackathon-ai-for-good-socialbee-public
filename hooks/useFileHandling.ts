import { ChangeEvent, useCallback, useRef, useState } from 'react';

export const useFileHandling = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = useCallback((files: FileList) => {
    const upcomingFiles = Array.from(files).filter(
      (file) => !!file && file.type === 'application/pdf', // remove null & leave pdfs only
    );

    if (upcomingFiles.length === 0) {
      alert('Please, choose a pdf file.');
      return;
    }

    if (upcomingFiles.length > 1) {
      alert('Please, choose one file at the time.');
      return;
    }

    setFile(upcomingFiles[0]);
  }, []);

  const removeFile = useCallback(() => setFile(null), []);

  const addFile = useCallback(() => inputFileRef.current?.click(), []);

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFileUpload(e.target.files);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return {
    file,
    handleFileUpload,
    removeFile,
    inputFileRef,
    addFile,
    handleInputFileChange,
  };
};
