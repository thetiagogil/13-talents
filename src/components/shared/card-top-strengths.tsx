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
import { useContext, useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { AuthContext } from "../../contexts/auth.context";
import { strengthsData } from "../../data/strengths.data";
import { STRENGTH_CATEGORIES } from "../../lib/constants";
import { StrengthModel } from "../../models/strength.model";
import { addHexTransparency } from "../../utils/add-hex-transparency";
import { colors, strengthsColor } from "../../utils/colors";

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

const AccordionItem = ({ rank, label, details, category }: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
            bgcolor={strengthsColor.find(item => item.category === category)?.color}
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

      <AccordionDetails>
        <Stack py={1}>
          <Typography level="body-sm">{details}</Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const StrengthsCategory = ({ category, percentage }: StrengthsCategoryProps) => {
  const color = strengthsColor.find(item => item.category === category)?.color;

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Box bgcolor={color} height={16} width={16} borderRadius="50%" />
      <Typography level="body-sm">
        {category} <strong>{percentage}%</strong>
      </Typography>
    </Stack>
  );
};

const userTopStrengths = (userStrengths: number[] | undefined, strengths: StrengthModel[]) => {
  // Handle top 10 strengths array
  const topStrengths = userStrengths
    ?.map(userStrength => strengths.find(strength => strength.id === userStrength))
    .slice(0, 10) as StrengthModel[];

  // Handle top 10 strengths categories percentages object
  const length = topStrengths.length;
  let topPercentagesInitial = Object.fromEntries(STRENGTH_CATEGORIES.map(cat => [cat, 0]));

  const topPercentages = topStrengths.reduce((accumulator, strengths) => {
    accumulator[strengths.category] = (accumulator[strengths.category] || 0) + 1;
    return accumulator;
  }, topPercentagesInitial);

  Object.keys(topPercentages).forEach(cat => {
    const category = cat as StrengthModel["category"];
    topPercentages[category] = length ? Math.round((topPercentages[category] / length) * 100) : 0;
  });

  return { userTopStrengthsArray: topStrengths, userTopStrengthsPercentages: topPercentages };
};

export const CardTopStrengths = () => {
  const { user } = useContext(AuthContext);
  const { userTopStrengthsArray, userTopStrengthsPercentages } = userTopStrengths(user?.strengths, strengthsData);

  return (
    <Stack bgcolor="neutral.white" maxWidth={440} mb={2} p={4} gap={4} borderRadius={20}>
      <Typography level="h4">Your Top 10 Strengths</Typography>

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
};
