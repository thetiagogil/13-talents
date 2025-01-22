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
import { useState } from "react";
import { mockTopStrengths } from "../../api/mock-data";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";

const AccordionItem = ({
  number,
  label,
  bgColor,
  details
}: {
  number: number;
  label: string;
  bgColor: string;
  details: string;
}) => {
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
              bgcolor: "#F1F1F1",
              py: 0.75,
              pl: 0.75,
              pr: 2.5,
              borderRadius: 20
            }
          }
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box
            sx={{
              bgcolor: bgColor,
              textAlign: "center",
              width: 40,
              py: 0.25,
              borderRadius: 20,
              boxShadow: "0px 4px 4px 0px #0000001A"
            }}
          >
            <Typography sx={{ fontSize: 18, color: "neutral.white" }}>{number}</Typography>
          </Box>
          <Typography sx={{ fontSize: 18 }}>{label}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        slotProps={{
          content: {
            sx: {
              width: "100%",
              bgcolor: "#F1F1F1",
              py: 2,
              px: 3,
              borderRadius: 20
            }
          }
        }}
      >
        <Typography sx={{ fontSize: 12 }}>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const StrengthItem = ({ color, label, percentage }: { color: string; label: string; percentage: number }) => (
  <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
    <Box sx={{ bgcolor: color, width: 15, height: 15, borderRadius: "50%" }} />
    <Typography sx={{ fontSize: 12 }}>
      {label} <strong>{percentage}%</strong>
    </Typography>
  </Stack>
);

export const CardTopStrengths = () => {
  return (
    <Stack sx={{ maxWidth: 440, bgcolor: "neutral.white", mb: 2, p: 4, gap: 4, borderRadius: 20 }}>
      <Typography sx={{ fontSize: 24 }}>Your Top 10 Strengths</Typography>

      <AccordionGroup disableDivider sx={{ gap: 0.75 }}>
        {mockTopStrengths.map((item, index) => (
          <AccordionItem
            key={index}
            number={item.number}
            label={item.label}
            bgColor={item.bgColor}
            details={item.details}
          />
        ))}
      </AccordionGroup>

      <Stack sx={{ width: "100%", flexDirection: "row", gap: 2.5 }}>
        <Stack sx={{ width: "50%", gap: 1.5 }}>
          <StrengthItem color="strengths.blue" label="Relationship Building" percentage={39} />
          <StrengthItem color="strengths.purple" label="Executing" percentage={23} />
        </Stack>

        <Stack sx={{ width: "50%", gap: 1.5 }}>
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
