import s from "./style.module.css";

interface GlobalModalProps {}

const GlobalModal: React.FunctionComponent<GlobalModalProps> = () => {
  return <div className={s.globalModal}></div>;
};

export default GlobalModal;
