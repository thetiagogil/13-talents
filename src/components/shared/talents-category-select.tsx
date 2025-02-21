import { List, ListDivider, ListItem, Option, Select, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { Fragment } from "react/jsx-runtime";
import { TalentModel } from "../../models/talent.model";
import { ColoredCircle } from "./colored-circle";

type TalentsCategorySelectProps = {
  talents: TalentModel[];
  value: number | null;
  onChange: (talentId: number) => void;
  sx?: SxProps;
};

export const TalentsCategorySelect = ({ talents, value, onChange, sx }: TalentsCategorySelectProps) => {
  const groupedTalents = talents.reduce<Record<string, TalentModel[]>>((acc, talent) => {
    acc[talent.category] = [...(acc[talent.category] || []), talent];
    return acc;
  }, {});

  return (
    <Select
      placeholder="Select a talent..."
      value={value || 0}
      onChange={(_, newValue) => onChange(newValue as number)}
      sx={{ ...sx }}
    >
      {Object.entries(groupedTalents).map(([category, talents], index) => (
        <Fragment key={category}>
          {index !== 0 && <ListDivider role="none" />}
          <List sx={{ "--ListItemDecorator-size": "28px" }}>
            <ListItem sticky>
              <Typography
                level="body-xs"
                textTransform="uppercase"
                startDecorator={<ColoredCircle color={category} size={12} />}
              >
                {category} ({talents.length})
              </Typography>
            </ListItem>
            {talents.map(talent => (
              <Option
                key={talent.id}
                value={talent.id}
                label={
                  <Typography level="body-md" startDecorator={<ColoredCircle color={category} size={12} />}>
                    {talent.label}
                  </Typography>
                }
              >
                {talent.label}
              </Option>
            ))}
          </List>
        </Fragment>
      ))}
    </Select>
  );
};
