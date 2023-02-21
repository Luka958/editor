// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import jsIcon from "../static/images/js.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tsIcon from "../static/images/ts.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ktsIcon from "../static/images/kts.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pyIcon from "../static/images/py.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import javaIcon from "../static/images/java.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import closeDarkIcon from "../static/images/close-dark.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import closeLightIcon from "../static/images/close-light.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fileIcon from "../static/images/file.png";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dirIcon from "../static/images/directory.png";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import menuIcon from "../static/images/menu.png";

export default {
  closeDarkIconSrc: closeDarkIcon.toString(),
  closeLightIconSrc: closeLightIcon.toString(),
  dirIconSrc: dirIcon.toString(),
  menuIconSrc: menuIcon.toString()
}

export function getIconFromExtension(ext: string): string {
  let icon = '';

  switch (ext) {
    case 'js': {
      icon = jsIcon.toString();
      break;
    }
    case 'ts': {
      icon = tsIcon.toString();
      break;
    }
    case 'kts': {
      icon = ktsIcon.toString();
      break;
    }
    case 'py': {
      icon = pyIcon.toString();
      break;
    }
    case 'java': {
      icon = javaIcon.toString();
      break;
    }
    default: {
      icon = fileIcon.toString();
    }
  }
  return icon;
}