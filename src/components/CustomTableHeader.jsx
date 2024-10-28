import { Stack, Typography } from "@mui/material";

/**
 * CustomTableHeader component
 * @param {string} title - title of the content
 * @param {string} content - content of the header
 * @returns {ReactElement} CustomTableHeader component
 */
export default function CustomTableHeader({title, content}){
    return(
        <Stack
          direction="column"
          sx={{
            alignItems: "flex-start"
          }}
        >
          <Typography variant="bmdsm" sx={{color: "dark.400"}}>{title}</Typography>
          <Typography variant="bsr" sx={{color: "dark.400"}}>{content}</Typography>
        </Stack>
    )
}