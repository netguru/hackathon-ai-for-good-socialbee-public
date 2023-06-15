import { useState } from 'react';
import Head from 'next/head';

import { DragDropWrapper } from '@/components/DragAndDropWrapper';
import { Instruction } from '@/components/Introduction';
import { Spinner } from '@/components/Spinner';
import { TextBlock } from '@/components/TextBlock';
import { useFileHandling } from '@/hooks/useFileHandling';
import { useApi } from '@/hooks/useApi';

const APP_NAME = 'SimpliDoc';
const MAX_TEXT_LENGTH = 4000;
const LANGUAGES = [
  { icon: '🇬🇧', name: 'English' },
  { icon: '🇩🇪', name: 'German' },
];

export default function Home() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [language, setLanguage] = useState<string>(LANGUAGES[0].name);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    file,
    handleFileUpload,
    removeFile,
    inputFileRef,
    addFile,
    handleInputFileChange,
  } = useFileHandling();
  const { handleSubmit } = useApi();

  const handleSimplify = async () => {
    if (!inputText && !file) {
      alert('Please enter a text or add a PDF file.');
      return;
    }

    if (inputText.length > MAX_TEXT_LENGTH && !file) {
      alert(
        `Please enter text less than ${MAX_TEXT_LENGTH} characters. You are currently at ${inputText.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputText('');

    try {
      const response = await handleSubmit({ inputText, language, file });
      setOutputText(response.data);
    } catch (error) {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content="Use AI to simplify your documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DragDropWrapper handleFiles={handleFileUpload}>
        <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
          <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
            <h1 className="text-center text-4xl font-bold">{APP_NAME}</h1>
            <p className="mt-4">Simplify your documents with AI</p>
            <div className="mt-6 flex flex-col items-center sm:flex-row">
              <p>Translate to</p>
              <select
                className="ml-0 mt-2 cursor-pointer rounded-md bg-white/10 p-2 font-medium sm:ml-2 sm:mt-0"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
              >
                {LANGUAGES.map(({ icon, name }) => (
                  <option key={name} value={name}>
                    {`${icon} ${name}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
            <div className="h-100 flex flex-col justify-center sm:w-2/4">
              <p className="mb-2 text-center text-lg font-bold">
                Your document
              </p>
              <div className="relative">
                {file ? (
                  <>
                    <TextBlock text={file.name} paddingRight />
                    <button
                      className={`absolute right-3 top-3 rounded-md bg-violet-500 px-3 py-2 text-sm font-medium ${
                        loading
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer hover:bg-violet-600'
                      }`}
                      onClick={removeFile}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <TextBlock
                    text={inputText}
                    editable={!loading}
                    onChange={(value) => {
                      setInputText(value);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="mt-8 flex h-full flex-col justify-center sm:mt-0 sm:w-2/4">
              <p className="mb-2 text-center text-lg font-bold">
                Simplified version
              </p>
              <div className="relative">
                {loading && <Spinner className="absolute left-3 top-3" />}
                <TextBlock text={outputText} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-2">
            <button
              className={`w-[140px] rounded-md bg-violet-500 px-4 py-2 font-medium ${
                loading
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:bg-violet-600'
              }`}
              onClick={handleSimplify}
              disabled={loading}
            >
              {loading ? 'Simplifying...' : 'Simplify'}
            </button>
          </div>

          <div className="mt-10">
            <Instruction onUpload={addFile} />
          </div>
        </div>
      </DragDropWrapper>
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        onChange={handleInputFileChange}
      />
    </>
  );
}
