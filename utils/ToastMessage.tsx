import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/toastdemo.css";
import { CheckCircle, Info, Warning, Cancel, Error } from "@mui/icons-material";

interface CustomToastProps {
  text: string;
  title: string;
  icon: string;
  message: string;
}
const CustomToast: React.FC<CustomToastProps> = ({
  text,
  title,
  icon,
  message,
}) => {
  let IconComponent;
  switch (icon) {
    case "success":
      IconComponent = CheckCircle;
      break;
    case "info":
      IconComponent = Info;
      break;
    case "warning":
      IconComponent = Warning;
      break;
    case "error":
      IconComponent = Error;
      break;
    case "dark":
      IconComponent = CheckCircle;
      break;
    default:
      IconComponent = Cancel;
  }

  return (
    <div className="container-toast">
      <div className="icon-toast pulse">
        <span className="material-symbols-outlined">
          <IconComponent />
        </span>
      </div>
      <div className="body-toast">
        <div className="title-toast">
          <p>{title}</p>
        </div>
        <div className="message-toast">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

/**
 *
 * @param {string} theme Theme name to apply: success, info, error or warning (type: String)
 * @param {string} message Enter a message (type: String)
 * @param {string} title Enter a title to the message (type: String)
 * @param {string} position Enter a position to the message (type: string)
 */
const ToastCustom = (theme: any, message: any, title: any, position: any) => {
  toast(
    <CustomToast text={message} title={title} icon={theme} message={message} />,
    {
      position: position,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: theme,
      progress: undefined,
    }
  );
};

export { ToastCustom };
