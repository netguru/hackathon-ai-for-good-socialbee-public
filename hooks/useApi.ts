import { useCallback } from 'react';

export const useApi = () => {
  const handleSubmit = useCallback(
    async ({
      inputText,
      language,
      file,
    }: {
      inputText: string;
      language: string;
      file?: File | null;
    }) => {
      let response;

      if (file) {
        response = await uploadFileToServer({ file, language });
      } else {
        response = await uploadTextToServer({ inputText, language });
      }

      if (!response.ok) {
        throw new Error('Something went wront');
      }

      return response.json();
    },
    [],
  );

  return { handleSubmit };
};

const uploadFileToServer = async ({
  file,
  language,
}: {
  file: File;
  language: string;
}) => {
  const body = new FormData();
  body.append('file', file);

  const response = await fetch(`/api/pdf?language=${language}`, {
    method: 'PUT',
    body,
  });

  return response;
};

const uploadTextToServer = async ({
  inputText,
  language,
}: {
  inputText: string;
  language: string;
}) => {
  const body = {
    input_text: inputText,
    language,
  };

  const response = await fetch('/api/text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response;
};
