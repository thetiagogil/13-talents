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
import { TalentModel } from "../../models/talent.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { ColoredCircle } from "./colored-circle";

type AccordionItemProps = {
  rank: number;
  label: TalentModel["label"];
  description: TalentModel["description"];
  category: TalentModel["category"];
};

type TalentsCategoryProps = {
  category: TalentModel["category"];
  percentage: number;
};

type TalentsCardProps = {
  userTopTalentsArray: TalentModel[];
  userTopTalentsPercentages: { [k: string]: number };
};

const AccordionItem = ({ rank, label, description, category }: AccordionItemProps) => {
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
              fontSize: isExpanded ? 13 : 12,
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
          <Typography level="body-sm">{description}</Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const TalentsCategory = ({ category, percentage }: TalentsCategoryProps) => (
  <Stack direction="row" alignItems="center" gap={1}>
    <ColoredCircle color={category} size={16} />
    <Typography level="body-sm">
      {category} <strong>{percentage}%</strong>
    </Typography>
  </Stack>
);

export const TalentsCard = ({ userTopTalentsArray, userTopTalentsPercentages }: TalentsCardProps) => (
  <Stack bgcolor="neutral.white" maxWidth={440} p={4} gap={4} borderRadius={20}>
    <Typography level="h4" textAlign={{ xs: "center", lg: "start" }}>
      Your Top 10 Talents
    </Typography>

    <AccordionGroup disableDivider>
      <Stack gap={1}>
        {userTopTalentsArray.map((item, index) => (
          <AccordionItem
            key={index}
            rank={index + 1}
            label={item.label}
            description={item.description}
            category={item.category}
          />
        ))}
      </Stack>
    </AccordionGroup>

    <Grid container spacing={1}>
      {Object.keys(userTopTalentsPercentages).map((category, index) => (
        <Grid key={index} xs={6}>
          <TalentsCategory
            category={category as TalentModel["category"]}
            percentage={userTopTalentsPercentages[category as TalentModel["category"]]}
          />
        </Grid>
      ))}
    </Grid>

    <Button variant="outlined" size="sm" disabled sx={{ opacity: 0.5 }}>
      See full report
    </Button>
  </Stack>
);
