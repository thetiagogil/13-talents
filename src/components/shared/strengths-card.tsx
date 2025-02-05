import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/joy";
import { useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { StrengthModel } from "../../models/strength.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { ColoredCircle } from "./colored-circle";

type AccordionItemProps = {
  rank: number;
  label: StrengthModel["label"];
  details: StrengthModel["details"];
  category: StrengthModel["category"];
};

type StrengthsCategoryProps = {
  category: StrengthModel["category"];
  percentage: number;
};

type StrengthsCardProps = {
  userTopStrengthsArray: StrengthModel[];
  userTopStrengthsPercentages: { [k: string]: number };
};

const AccordionItem = ({ rank, label, details, category }: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(prev => !prev)}
      sx={{
        bgcolor: "neutral.lightest",
        borderRadius: 20
      }}
    >
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
              bgcolor: "neutral.lightest",
              pl: 1,
              borderRadius: 20
            }
          }
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Box
            bgcolor={getColorHex(category)}
            width={36}
            textAlign="center"
            py={0.6}
            borderRadius={20}
            boxShadow={`0px 4px 4px 0px ${getColorTransparency(getColorHex("black"), 10)}`}
          >
            <Typography level="body-md" textColor="neutral.white">
              {rank}
            </Typography>
          </Box>
          <Typography level="body-md">{label}</Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack py={1}>
          <Typography level="body-sm">{details}</Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const StrengthsCategory = ({ category, percentage }: StrengthsCategoryProps) => (
  <Stack direction="row" alignItems="center" gap={1}>
    <ColoredCircle color={category} size={16} />
    <Typography level="body-sm">
      {category} <strong>{percentage}%</strong>
    </Typography>
  </Stack>
);

export const StrengthsCard = ({ userTopStrengthsArray, userTopStrengthsPercentages }: StrengthsCardProps) => (
  <Stack bgcolor="neutral.white" maxWidth={440} p={4} gap={4} borderRadius={20}>
    <Typography level="h4" textAlign={{ xs: "center", lg: "start" }}>
      Your Top 10 Strengths
    </Typography>

    <AccordionGroup disableDivider>
      <Stack gap={1}>
        {userTopStrengthsArray.map((item, index) => (
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

    <Grid container spacing={1}>
      {Object.keys(userTopStrengthsPercentages).map((category, index) => (
        <Grid key={index} xs={6}>
          <StrengthsCategory
            category={category as StrengthModel["category"]}
            percentage={userTopStrengthsPercentages[category as StrengthModel["category"]]}
          />
        </Grid>
      ))}
    </Grid>

    <Button variant="outlined" size="sm" disabled>
      See full report
    </Button>
  </Stack>
);
