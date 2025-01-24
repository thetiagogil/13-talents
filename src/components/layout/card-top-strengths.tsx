import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography
} from "@mui/joy";
import { useContext, useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { AuthContext } from "../../contexts/auth.context";
import { strengthsData } from "../../data/strengths.data";
import { StrengthModel } from "../../models/strength.model";
import { addHexTransparency } from "../../utils/add-hex-transparency";
import { colors, strengthsColor } from "../../utils/colors";

type AccordionItemProps = {
  rank: number;
  label: string;
  details: string;
  category: string;
};

type StrengthItemProps = {
  color: string;
  label: string;
  percentage: number;
};

const AccordionItem = ({ rank, label, details, category }: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Accordion expanded={isExpanded} onChange={() => setIsExpanded(prev => !prev)} sx={{ gap: 0.75 }}>
      <AccordionSummary
        indicator={
          <PlusSignOutlined
            sx={{
              fontSize: 12,
              transition: "0.3s",
              transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)"
            }}
          />
        }
        slotProps={{
          button: {
            sx: {
              width: "100%",
              bgcolor: "neutral.lightest",
              py: 0.5,
              pl: 1,
              pr: 2.5,
              borderRadius: 20
            }
          }
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Box
            bgcolor={() => strengthsColor(category)}
            width={36}
            textAlign="center"
            py={0.5}
            borderRadius={20}
            boxShadow={`0px 4px 4px 0px ${addHexTransparency(colors.neutral.black, "10%")}`}
          >
            <Typography level="body-md" textColor="neutral.white">
              {rank}
            </Typography>
          </Box>
          <Typography level="body-md">{label}</Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails
        slotProps={{
          content: {
            sx: {
              bgcolor: "neutral.lightest",
              width: "100%",
              py: 2,
              px: 3,
              borderRadius: 20
            }
          }
        }}
      >
        <Typography level="body-sm">{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const StrengthItem = ({ color, label, percentage }: StrengthItemProps) => (
  <Stack direction="row" alignItems="center" gap={1}>
    <Box bgcolor={color} height={16} width={16} borderRadius="50%" />
    <Typography level="body-sm">
      {label} <strong>{percentage}%</strong>
    </Typography>
  </Stack>
);

const userTopStrengthsArray = (userStrengths: number[] | undefined, strengths: StrengthModel[]) => {
  let newArray = [] as StrengthModel[];

  strengths.forEach(strengthOjb => {
    userStrengths?.forEach(userStrength => {
      userStrength === strengthOjb.id && newArray.push(strengthOjb);
    });
  });

  return newArray;
};

export const CardTopStrengths = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack bgcolor="neutral.white" maxWidth={440} mb={2} p={4} gap={4} borderRadius={20}>
      <Typography level="h4">Your Top 10 Strengths</Typography>

      <AccordionGroup disableDivider>
        <Stack gap={0.75}>
          {userTopStrengthsArray(user?.strengths, strengthsData).map((item, index) => (
            <AccordionItem
              key={index}
              rank={index + 1}
              label={item.label}
              details={item.details}
              category={item.category}
            />
          ))}
        </Stack>
      </AccordionGroup>

      <Stack width="100%" direction="row" gap={2.5}>
        <Stack width="50%" gap={1.5}>
          <StrengthItem color="strengths.blue" label="Relationship Building" percentage={39} />
          <StrengthItem color="strengths.purple" label="Executing" percentage={23} />
        </Stack>

        <Stack width="50%" gap={1.5}>
          <StrengthItem color="strengths.orange" label="Influencing" percentage={27} />
          <StrengthItem color="strengths.green" label="Strategic Thinking" percentage={11} />
        </Stack>
      </Stack>

      <Button variant="outlined" size="sm">
        See full report
      </Button>
    </Stack>
  );
};
