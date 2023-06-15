interface Props {
  text: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  paddingRight?: boolean;
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  onChange = () => {},
  paddingRight = false,
}) => {
  return (
    <textarea
      className={'min-h-[500px] w-full rounded-md bg-[#1A1B26] p-4 text-[15px] text-neutral-200 focus:outline-none'.concat(
        paddingRight ? ' pr-[120px]' : '',
      )}
      style={{ resize: 'none' }}
      value={text}
      onChange={(e) => onChange(e.target.value)}
      disabled={!editable}
    />
  );
};
