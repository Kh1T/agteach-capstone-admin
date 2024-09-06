import { Stack, Typography } from '@mui/material';
import Dot from '@mui/icons-material/FiberManualRecord';


/**
 * CustomChip component
 * @description A component that renders a chip with a label and optional "danger" mode
 * @param {object} props - The component props
 * @param {string} props.label - The label to be displayed in the chip
 * @param {boolean} [props.danger=false] - Whether or not the chip should be in "danger" mode
 * @param {object} [props.sx={}] - Additional styles to be applied to the chip
 * @returns {ReactElement} A React component representing a chip
 */
export const CustomChip = (props) => {
  const { label, danger, ...sx } = props;
  return !danger ? (
    <Stack
      sx={{
        backgroundColor: 'blue.light',
        color: 'blue.main',
        width: 'fit-content',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        pr: 2,
        pl: 1,
        py: 0.8,
        borderRadius: 100,
        ...sx.sx,
      }}
    >
      <Dot sx={{ width: 15, height: 15, color: 'blue.main' }} />
      <Typography variant="bxssm">{label}</Typography>
    </Stack>
  ) : (
    <Stack
      sx={{
        backgroundColor: 'red.light',
        color: 'red.main',
        width: 'fit-content',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        pr: 2,
        pl: 1,
        py: 0.8,
        borderRadius: 100,
        ...sx.sx,
      }}
    >
      <Dot sx={{ width: 15, height: 15, color: 'red.main' }} />
      <Typography variant="bxssm">{label}</Typography>
    </Stack>
  );
};
