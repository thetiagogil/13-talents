import { List, ListDivider, ListItem, Option, Select, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";
import { AuthContext } from "../../contexts/auth.context";
import { StrengthModel } from "../../models/strength.model";
import { ColoredCircle } from "./colored-circle";

type GroupedSingleSelectProps = {
  value: number | null;
  onChange: (strengthId: number) => void;
  sx?: SxProps;
};

export const StrengthsCategorySelect = ({ value, onChange, sx }: GroupedSingleSelectProps) => {
  const { strengths } = useContext(AuthContext);
  const groupedStrengths = strengths.reduce<Record<string, StrengthModel[]>>((acc, strength) => {
    acc[strength.category] = [...(acc[strength.category] || []), strength];
    return acc;
  }, {});

  return (
    <Select
      placeholder="Select a strength..."
      value={value || 0}
      onChange={(_, newValue) => onChange(newValue as number)}
      sx={{ ...sx }}
    >
      {Object.entries(groupedStrengths).map(([category, strengths], index) => (
        <Fragment key={category}>
          {index !== 0 && <ListDivider role="none" />}
          <List sx={{ "--ListItemDecorator-size": "28px" }}>
            <ListItem sticky>
              <Typography
                level="body-xs"
                textTransform="uppercase"
                startDecorator={<ColoredCircle color={category} size={12} />}
              >
                {category} ({strengths.length})
              </Typography>
            </ListItem>
            {strengths.map(strength => (
              <Option
                key={strength.id}
                value={strength.id}
                label={
                  <Typography level="body-md" startDecorator={<ColoredCircle color={category} size={12} />}>
                    {strength.label}
                  </Typography>
                }
              >
                {strength.label}
              </Option>
            ))}
          </List>
        </Fragment>
      ))}
    </Select>
  );
};
