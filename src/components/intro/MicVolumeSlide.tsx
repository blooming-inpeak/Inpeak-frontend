interface Props {
  volume: number;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MicVolumeSlide = ({ volume, handleVolumeChange }: Props) => {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      style={{ width: '168px' }}
    />
  );
};
