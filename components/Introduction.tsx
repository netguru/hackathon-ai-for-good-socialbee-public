export const Instruction = ({ onUpload }: { onUpload: () => void }) => (
  <ol className="list-decimal pl-4 text-base">
    <li>Choose desired translation language</li>
    <li>
      Enter a document text OR{' '}
      <button
        className="px-0.5 italic underline decoration-violet-500 decoration-2 underline-offset-2"
        onClick={onUpload}
      >
        upload
      </button>{' '}
      a PDF file
    </li>
    <li>Click &quot;Simplify&quot;</li>
    <li>You got it!</li>
  </ol>
);
