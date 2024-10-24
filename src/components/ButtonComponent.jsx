import { Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * A component that renders a styled button with a link to another page.
 * The button is contained and colored according to the provided color.
 * The button is also a full width block.
 *
 * @param {string} path the path to link to
 * @param {string} color the color of the button
 * @param {ReactNode} children the content of the button
 * @returns {ReactElement}
 */
export default function ButtonComponent({ path, color, children, ...props }) {
  return (
    <Link component={RouterLink} to={path}>
      <Button variant="contained" color={color} {...props}>
        {children}
      </Button>
    </Link>
  );
}
