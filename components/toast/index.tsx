import { internalUseToast } from "contexts/toast-context";
import {
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineWarning,
  AiOutlineNotification,
} from "react-icons/ai";
import s from "./style.module.css";

export default function ToastComponent() {
  const { toasts, remove } = internalUseToast();

  return toasts[0] ? (
    <div className={s.toasts}>
      {toasts.map((toast) => {
        let icon: React.ReactElement;
        switch (toast.type) {
          case "success":
            icon = <AiOutlineCheckCircle color="green" />;
            break;
          case "error":
            icon = <AiOutlineCloseCircle color="red" />;
            break;
          case "warning":
            icon = <AiOutlineWarning color="orange" />;
            break;
          case "notification":
            icon = <AiOutlineNotification color="#00a8ff" />;
            break;
        }

        return (
          <div key={toast.message} className={s.toast}>
            <div className={s.toastIcon}>
              {icon}
              {/* {toast.type === "success" && <AiOutlineCheckCircle color="green" />}{" "}
              {toast.type === "error" && <AiOutlineCloseCircle color="red" />}
              {toast.type === "warning" && <AiOutlineWarning color="orange" />}
              {toast.type === "notification" && <AiOutlineNotification color="#00a8ff" />} */}
            </div>
            <div className={s.messageContainer}>
              <p>{toast.message}</p>
            </div>
            <div className={s.closeButton}>
              <button
                onClick={() => {
                  setTimeout(() => {
                    remove(toast.message);
                  }, 100);
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
}
