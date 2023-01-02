type Props = {
  icon: JSX.Element;
  text: string
};

export const AmenityCard = ({ icon, text }: Props) => (
  <div className="d-flex align-items-center" style={{ gap: '1.5em' }}>
    { icon }
    <span> { text } </span>
  </div>
);
